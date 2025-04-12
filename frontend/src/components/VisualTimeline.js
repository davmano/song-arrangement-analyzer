import React from "react";
import "./VisualTimeline.css";

const COLORS = [
  "#6c5ce7", "#00b894", "#fdcb6e", "#0984e3", "#d63031", "#e84393"
];

const VisualTimeline = ({ structure }) => {
  if (!structure.length) return null;

  const totalDuration = structure[structure.length - 1].end;

  return (
    <div className="timeline-container">
      {structure.map((section, index) => {
        const widthPercent = ((section.end - section.start) / totalDuration) * 100;

        return (
          <div
            key={index}
            className="timeline-block"
            style={{
              width: `${widthPercent}%`,
              backgroundColor: COLORS[index % COLORS.length]
            }}
          >
            <span className="label">{section.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default VisualTimeline;

