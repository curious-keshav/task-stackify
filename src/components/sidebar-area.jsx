import React from 'react';
import MoveX from './animations/motion/move-x';
import MoveY from './animations/motion/move-y';
import RotateClockwise from './animations/motion/rotate-clockwise';
import RotateAnticlockwise from './animations/motion/rotate-anticlockwise';
import MoveAtCoordinates from './animations/motion/move-at-coordinates';
import SayMessage from './animations/looks/say-message';
import SayMessageWithDelay from './animations/looks/say-message-with-delay';
import SayMessageForSeconds from './animations/looks/say-message-for-seconds';
import ThinkMessage from './animations/looks/thing-message';
import ThinkMessageWithDelay from './animations/looks/think-message-with-delay';
import ThinkMessageForSeconds from './animations/looks/think-message-for-seconds';
import RepeatAction from './animations/motion/repeat-action';

const SidebarArea = () => {
  return (
    <div className="bg-[#1e1e1e] text-white min-w-[19rem] p-5 rounded-xl shadow-lg overflow-y-scroll space-y-6">
      <h2 className="text-4xl text-center font-bold tracking-wide text-muted-foreground">Task Stackify</h2>
      <hr className="border-gray-600" />


      {/* Motion Section */}
      <section className='space-y-4'>
        <h3 className="text-lg font-semibold text-muted-foreground">Motion</h3>

        <div className="space-y-2 ">
          <MoveX />
          <MoveY />
        </div>

        <div className='space-y-2'>
          <RotateClockwise />
          <RotateAnticlockwise />
        </div>

        <MoveAtCoordinates />

        <RepeatAction/>
      </section>

      <hr className="border-gray-600" />

      {/* Looks Section */}
      <section className='space-y-4'>

        <h3 className="text-lg font-semibold text-muted-foreground">Looks</h3>

        <div className="space-y-2 ">
          <SayMessage />
          <SayMessageWithDelay />
          <SayMessageForSeconds />
        </div>

        <div className="space-y-2 ">
          <ThinkMessage />
          <ThinkMessageWithDelay />
          <ThinkMessageForSeconds />
        </div>

      </section>
    </div>
  );
};

export default SidebarArea;
