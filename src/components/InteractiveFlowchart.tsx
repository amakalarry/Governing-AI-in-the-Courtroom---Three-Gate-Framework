import React from 'react';
import {
  Bot,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Link2,
  Scale,
  Search,
  Target,
  TrafficCone,
} from 'lucide-react';
import {
  FRAMEWORK_NODES,
  NodeId,
  TrackId,
} from '../data/evidenceFramework';

interface InteractiveFlowchartProps {
  selectedNode: NodeId;
  onSelectNode: (id: NodeId) => void;
  activeTrack: TrackId;
  highlightedPath?: NodeId[];
}

export const InteractiveFlowchart: React.FC<InteractiveFlowchartProps> = ({
  selectedNode,
  onSelectNode,
  activeTrack,
  highlightedPath,
}) => {
  const isNodeHighlighted = (id: NodeId): boolean => {
    if (highlightedPath && highlightedPath.length > 0) {
      return highlightedPath.includes(id);
    }
    if (activeTrack === 'all') return true;
    const node = FRAMEWORK_NODES[id];
    if (node.track === 'shared') return true;
    return node.track === activeTrack;
  };

  const nodeCardClass = (id: NodeId, tone: 'neutral' | 'lapis' | 'forest' = 'neutral') => {
    const selected = selectedNode === id;
    const active = isNodeHighlighted(id);

    const base =
      'w-full text-left transition-all duration-150 rounded-lg border px-4 py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5]';

    if (!active) {
      return `${base} opacity-35 bg-[#F4F0E8] border-[#EBE6DF] text-[#57534E]`;
    }

    if (selected) {
      if (tone === 'forest') {
        return `${base} bg-[#14532D] border-[#14532D] text-[#FBF9F5] shadow-sm`;
      }
      return `${base} bg-[#1E3A8A] border-[#1E3A8A] text-[#FBF9F5] shadow-sm`;
    }

    if (tone === 'forest') {
      return `${base} bg-[#F3F8F4] border-[#BBF7D0] text-[#14532D] hover:border-[#14532D]`;
    }

    return `${base} bg-white border-[#D6CEBE] text-[#1C1917] hover:border-[#1E3A8A]`;
  };

  const renderDownArrow = (active: boolean) => (
    <div
      className={`flex flex-col items-center py-1 transition-opacity duration-150 ${
        active ? 'opacity-100 text-[#1C1917]' : 'opacity-25 text-[#78716C]'
      }`}
      aria-hidden="true"
    >
      <div className="w-px h-5 bg-current" />
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <div className="bg-[#F4F0E8]/70 border border-[#D6CEBE] rounded-xl p-6 lg:p-8">
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        {/* 01: AI EVIDENCE */}
        <div className="w-full max-w-[260px]">
          <button
            type="button"
            onClick={() => onSelectNode('ai-evidence')}
            className={nodeCardClass('ai-evidence')}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Bot className="w-4 h-4 shrink-0" />
                <FileText className="w-4 h-4 shrink-0 -ml-1.5" />
                <span className="font-semibold text-sm tracking-tight truncate">
                  AI Evidence
                </span>
              </div>
              <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                01
              </span>
            </div>
          </button>
        </div>

        {renderDownArrow(isNodeHighlighted('classification'))}

        {/* 02: FUNCTION CLASSIFICATION */}
        <div className="w-full max-w-[300px]">
          <button
            type="button"
            onClick={() => onSelectNode('classification')}
            className={nodeCardClass('classification')}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <TrafficCone className="w-4 h-4 shrink-0" />
                <span className="font-semibold text-sm tracking-tight truncate">
                  Function Classification
                </span>
              </div>
              <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                02
              </span>
            </div>
          </button>
        </div>

        {/* Bifurcation Connector */}
        <div className="w-full max-w-lg px-8 sm:px-16" aria-hidden="true">
          <div className="flex justify-center">
            <div className="w-px h-4 bg-[#57534E]" />
          </div>
          <div className="grid grid-cols-2 border-t border-[#57534E]">
            <div className="border-r border-transparent flex justify-start">
              <div
                className={`w-px h-5 ${
                  isNodeHighlighted('extractive') ? 'bg-[#1C1917]' : 'bg-[#D6CEBE]'
                }`}
              />
            </div>
            <div className="flex justify-end">
              <div
                className={`w-px h-5 ${
                  isNodeHighlighted('interpretive') ? 'bg-[#1C1917]' : 'bg-[#D6CEBE]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Branch Columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Left Branch: Extractive -> Traditional Admission */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onSelectNode('extractive')}
              className={nodeCardClass('extractive')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Search className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm truncate">Extractive</span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  03A
                </span>
              </div>
              <p className={`mt-1 text-xs ${selectedNode === 'extractive' ? 'text-white/80' : 'text-[#57534E]'}`}>
                Direct retrieval & transcription
              </p>
            </button>

            {renderDownArrow(isNodeHighlighted('traditional-admission'))}

            <button
              type="button"
              onClick={() => onSelectNode('traditional-admission')}
              className={nodeCardClass('traditional-admission')}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm truncate">
                  Traditional Admission
                </span>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  04A
                </span>
              </div>
              <p className={`mt-1 text-xs ${selectedNode === 'traditional-admission' ? 'text-white/80' : 'text-[#57534E]'}`}>
                Standard authentication rules
              </p>
            </button>
          </div>

          {/* Right Branch: Interpretive -> Burden of Proof -> 3 Gates -> Admissible */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onSelectNode('interpretive')}
              className={nodeCardClass('interpretive')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Brain className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm truncate">Interpretive</span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  03B
                </span>
              </div>
              <p className={`mt-1 text-xs ${selectedNode === 'interpretive' ? 'text-white/80' : 'text-[#57534E]'}`}>
                Inference, scoring & synthesis
              </p>
            </button>

            {renderDownArrow(isNodeHighlighted('burden-of-proof'))}

            <button
              type="button"
              onClick={() => onSelectNode('burden-of-proof')}
              className={nodeCardClass('burden-of-proof')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm truncate">
                    Burden of Proof
                  </span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  04B
                </span>
              </div>
              <p className={`mt-1 text-xs ${selectedNode === 'burden-of-proof' ? 'text-white/80' : 'text-[#57534E]'}`}>
                Proponent carries verification duty
              </p>
            </button>

            {renderDownArrow(isNodeHighlighted('disclosure'))}

            {/* Gate 1: Disclosure */}
            <button
              type="button"
              onClick={() => onSelectNode('disclosure')}
              className={nodeCardClass('disclosure')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <ClipboardCheck className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm tracking-wide truncate">
                    Disclosure
                  </span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  05
                </span>
              </div>
              <div className={`mt-2 flex items-center gap-3 text-xs ${selectedNode === 'disclosure' ? 'text-white/85' : 'text-[#57534E]'}`}>
                <span>Docs</span>
                <span aria-hidden="true">·</span>
                <span>Labels</span>
                <span aria-hidden="true">·</span>
                <span>Checks</span>
                <span aria-hidden="true">·</span>
                <span>Notice</span>
              </div>
            </button>

            {renderDownArrow(isNodeHighlighted('reliability'))}

            {/* Gate 2: Reliability */}
            <button
              type="button"
              onClick={() => onSelectNode('reliability')}
              className={nodeCardClass('reliability')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Target className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm tracking-wide truncate">
                    Reliability
                  </span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  06
                </span>
              </div>
              <div className={`mt-2 flex items-center gap-3 text-xs ${selectedNode === 'reliability' ? 'text-white/85' : 'text-[#57534E]'}`}>
                <span>Accuracy</span>
                <span aria-hidden="true">·</span>
                <span>Error</span>
                <span aria-hidden="true">·</span>
                <span>Repeat</span>
                <span aria-hidden="true">·</span>
                <span>Explain</span>
              </div>
            </button>

            {renderDownArrow(isNodeHighlighted('provenance'))}

            {/* Gate 3: Provenance */}
            <button
              type="button"
              onClick={() => onSelectNode('provenance')}
              className={nodeCardClass('provenance')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Link2 className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm tracking-wide truncate">
                    Provenance
                  </span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-70 shrink-0">
                  07
                </span>
              </div>
              <div className={`mt-2 flex items-center gap-3 text-xs ${selectedNode === 'provenance' ? 'text-white/85' : 'text-[#57534E]'}`}>
                <span>Chain</span>
                <span aria-hidden="true">·</span>
                <span>Crypto</span>
                <span aria-hidden="true">·</span>
                <span>Audit</span>
                <span aria-hidden="true">·</span>
                <span>Lifecycle</span>
              </div>
            </button>

            {renderDownArrow(isNodeHighlighted('admissible'))}

            {/* Terminal: Admissible */}
            <button
              type="button"
              onClick={() => onSelectNode('admissible')}
              className={nodeCardClass('admissible', 'forest')}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-sm tracking-wide truncate">
                    Admissible
                  </span>
                </div>
                <span className="font-mono text-xs tabular-nums opacity-75 shrink-0">
                  08
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
