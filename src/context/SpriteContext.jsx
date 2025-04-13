/* eslint-disable no-case-declarations */
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Characters } from "../utility/characters";

const SpriteContext = createContext();

export const useSpriteContext = () => useContext(SpriteContext);

export const SpriteProvider = ({ children }) => {
    const [sprites, setSprites] = useState([]);
    const [tooltipMessages, setTooltipMessages] = useState({});
    const [selectedSpriteId, setSelectedSpriteId] = useState(null);
    const [isThinking, setIsThinking] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const runStack = async (blocks, spriteId) => {
        for (const block of blocks) {
            const { type, props } = block;

            switch (type) {
                case "MOVE_X":
                    await moveBy(spriteId, Number(props?.value || 10), 0);
                    break;
                case "MOVE_Y":
                    await moveBy(spriteId, 0, Number(props?.value || 10));
                    break;
                case "GO_TO":
                    setSprites((prev) => prev.map((s) => (s.id === spriteId ? { ...s, position: { x: props?.x ?? 0, y: props?.y ?? 0 } } : s)));
                    await delay(500);
                    break;

                case "SAY":
                    setIsThinking((prev) => ({ ...prev, [spriteId]: false }));
                    setTooltipMessages((prev) => ({ ...prev, [spriteId]: props?.message }));
                    await delay((props?.duration || 1) * 1000);
                    setTooltipMessages((prev) => ({ ...prev, [spriteId]: "" }));
                    break;
                case "THINK":
                    setIsThinking((prev) => ({ ...prev, [spriteId]: true }));
                    setTooltipMessages((prev) => ({ ...prev, [spriteId]: props?.message }));
                    await delay((props?.duration || 1) * 1000);
                    setTooltipMessages((prev) => ({ ...prev, [spriteId]: "" }));
                    break;

                case "TURN_DEGREES":
                    setSprites((prev) =>
                        prev.map((s) => {
                            if (s.id === spriteId) {
                                const currentAngle = s.angle || 0;
                                const newAngle = currentAngle + Number(props?.degrees || 0);
                                return { ...s, angle: newAngle };
                            }
                            return s;
                        })
                    );
                    break;

                case "REPEAT": {
                    const times = Number(props?.count || 1);
                    const currentIndex = blocks.indexOf(block);
                    const previousBlocks = blocks.slice(0, currentIndex);

                    for (let j = 0; j < times; j++) {
                        await runStack(previousBlocks, spriteId);

                        setSprites((prev) =>
                            prev.map((s) => {
                                if (s.id === spriteId) {
                                    const resetAngle = s.angle || 0;
                                    return { ...s, angle: resetAngle };
                                }
                                return s;
                            })
                        );

                        await delay(100);
                    }
                    break;
                }
            }
        }
    }

    const moveBy = (spriteId, dx, dy) =>
        new Promise((resolve) => {
            setSprites((prev) => {
                const updatedSprites = prev?.map((sprite) => {
                    if (sprite.id !== spriteId) return sprite;

                    const newPos = {
                        x: sprite?.position?.x + dx,
                        y: sprite?.position?.y + dy,
                    };

                    return { ...sprite, position: newPos };
                });

                const current = updatedSprites.find((s) => s.id === spriteId);
                const collided = updatedSprites.find(
                    (s) => s.id !== spriteId && Math.abs(s.position.x - current.position.x) < 95 && Math.abs(s.position.y - current.position.y) < 100
                );

                if (collided) {
                    console.log(spriteId, "Hero Feature Collision between:", collided.id);
                    return updatedSprites.map((s) => {
                        if (s.id === spriteId) return { ...s, stack: collided.stack };
                        if (s.id === collided.id) return { ...s, stack: current.stack };
                        return s;
                    });
                }

                setTimeout(resolve, 500);
                return updatedSprites;
            });
        });

    const updateSpriteStack = (spriteId, blocks) => {
        setSprites((prev) => prev.map((s) => (s.id === spriteId ? { ...s, stack: blocks } : s)));
    };

    const addNewSprite = (characterKey) => {
        const character = Characters[characterKey];
        const id = uuidv4();
        const name = `${character.label} ${sprites.filter((s) => s.type === character.type).length + 1}`;

        let x = 50;
        let y = 50;
        // const padding = 10;

        // Ensure non-overlapping position
        // while (sprites.some((s) => Math.abs(s.position.x - x) < 95 + padding && Math.abs(s.position.y - y) < 100 + padding)) {
        //   x += 30;
        //   y += 30;
        //   if (x > 250) x = 50;
        //   if (y > 250) y = 50;
        // }

        setSprites((prev) => [
            ...prev,
            {
                id,
                name,
                type: character.type,
                position: { x, y },
                stack: [],
                component: character.component,
            },
        ]);
    };

    const runAllStacks = () => {
        sprites.forEach((sprite) => {
            runStack(sprite.stack, sprite.id);
        });
    };

    const handleSelectCharacter = (key) => {
        addNewSprite(key);
        setShowModal(false);
    };

    const handleSpriteSelection = (id) => {
        if (selectedSpriteId === id) {
            setSelectedSpriteId(null);
        } else {
            setSelectedSpriteId(id);
        }
    };

    return (
        <SpriteContext.Provider
            value={{
                sprites,
                setSprites,
                tooltipMessages,
                setTooltipMessages,
                selectedSpriteId,
                setSelectedSpriteId,
                isThinking,
                setIsThinking,
                showModal,
                setShowModal,
                runStack,
                runAllStacks,
                updateSpriteStack,
                addNewSprite,
                handleSelectCharacter,
                handleSpriteSelection,
            }}
        >
            {children}
        </SpriteContext.Provider>
    );
};
