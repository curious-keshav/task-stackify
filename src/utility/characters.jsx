import CatSprite from "../assets/CatSprite";
import DogSprite from "../assets/DogSprite";
import DuckSprite from "../assets/DuckSprite";
import SpriteWrapper from "../components/sprite-wrapper";

export const Characters = {
    CAT: {
        type: "CAT",
        label: "Cat",
        component: (
            <SpriteWrapper>
                <CatSprite />
            </SpriteWrapper>
        ),
    },
    DOG: {
        type: "DOG",
        label: "Dog",
        component: (
            <SpriteWrapper>
                <DogSprite />
            </SpriteWrapper>
        ),
    },
    DUCK: {
        type: "DUCK",
        label: "Duck",
        component: (
            <SpriteWrapper>
                <DuckSprite />
            </SpriteWrapper>
        ),
    },
};
