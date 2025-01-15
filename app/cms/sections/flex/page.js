// pages/flex-layouts.js

import React from "react";

const FlexLayouts = () => {
  return (
    <div className="p-8 space-y-12">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-8">
        Tailwind CSS Flex Layout Examples
      </h1>

      {/* Flex Row */}
      <section>
        <h2 className="text-lg font-semibold mb-4">1. Row Layout (Default)</h2>
        <div className="flex space-x-4">
          <button className="btn">Button 1</button>
          <h2 className="text-xl font-semibold">hello world</h2>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Flex Row Reverse */}
      <section>
        <h2 className="text-lg font-semibold mb-4">2. Row-Reverse Layout</h2>
        <div className="flex flex-row-reverse space-x-reverse space-x-4">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Flex Column */}
      <section>
        <h2 className="text-lg font-semibold mb-4">3. Column Layout</h2>
        <div className="flex flex-col space-y-4">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Flex Column Reverse */}
      <section>
        <h2 className="text-lg font-semibold mb-4">4. Column-Reverse Layout</h2>
        <div className="flex flex-col-reverse space-y-reverse space-y-4">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Justify Content: Center */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          5. Justify Content: Center
        </h2>
        <div className="flex justify-center space-x-4">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Justify Content: Space Between */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          6. Justify Content: Space Between
        </h2>
        <div className="flex justify-between">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Justify Content: Space Around */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          7. Justify Content: Space Around
        </h2>
        <div className="flex justify-around">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Align Items: Center */}
      <section>
        <h2 className="text-lg font-semibold mb-4">8. Align Items: Center</h2>
        <div className="flex items-center h-24 border border-gray-300">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Align Items: Start */}
      <section>
        <h2 className="text-lg font-semibold mb-4">9. Align Items: Start</h2>
        <div className="flex items-start h-24 border border-gray-300">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Align Items: End */}
      <section>
        <h2 className="text-lg font-semibold mb-4">10. Align Items: End</h2>
        <div className="flex items-end h-24 border border-gray-300">
          <button className="btn">Button 1</button>
          <button className="btn">Button 2</button>
          <button className="btn">Button 3</button>
        </div>
      </section>

      {/* Wrap */}
      <section>
        <h2 className="text-lg font-semibold mb-4">11. Wrap Layout</h2>
        <div className="flex flex-wrap space-x-4 space-y-4">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <button className="btn" key={idx}>
                Button {idx + 1}
              </button>
            ))}
        </div>
      </section>
    </div>
  );
};

export default FlexLayouts;
