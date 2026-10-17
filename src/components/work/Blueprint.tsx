interface BlueprintProps {
  nodes: string[]
  index: number
}

export function Blueprint({ nodes, index }: BlueprintProps) {
  return (
    <div
      className={`system-drawing drawing-${index}`}
      role="img"
      aria-label={`Conceptual workflow: ${nodes.join(', ')}`}
    >
      <div className="drawing-meta">
        <span>FIG. 0{index + 1} / SYSTEM MAP</span>
        <span>CONCEPTUAL VIEW</span>
      </div>
      <svg viewBox="0 0 700 330" className="drawing-svg" aria-hidden="true">
        <g className="draw-lines" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M80 90h540v170H80zM80 123h540M264 123v137M80 170h184M80 215h184M299 154h284v78H299zM312 215l40-20 45 9 42-35 42 17 46-24 44 8" />
          <path d="M112 106h4m8 0h4m8 0h4M105 145h128m-128 48h92m-92 46h112M312 246h70m18 0h70m18 0h70" />
          <path strokeDasharray="4 5" d="M30 90h35m570 0h35M80 38v37m540-37v37M350 270v37M30 260h35m570 0h35" />
          <path d="M80 52h540m-540-5v10m540-10v10M650 90v170m-5-170h10m-10 170h10" />
        </g>
        <text x="350" y="43" textAnchor="middle" className="svg-label">
          CONNECTED WORKFLOW / 04 NODES
        </text>
        <text x="112" y="310" className="svg-label">
          INPUT → PROCESS → PERSIST → SYNC
        </text>
      </svg>
      <div className="node-strip">
        {nodes.map((node, i) => (
          <span key={node}>
            <small>0{i + 1}</small>
            {node}
          </span>
        ))}
      </div>
    </div>
  )
}
