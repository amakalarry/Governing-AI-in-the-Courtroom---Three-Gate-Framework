import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  FileImage,
  Maximize2,
  X,
} from 'lucide-react';
import { InteractiveFlowchart } from './components/InteractiveFlowchart';
import {
  ASCII_BLUEPRINT,
  FRAMEWORK_NODES,
  GENERATED_DIAGRAM_URL,
  NodeId,
  TrackId,
  WALKTHROUGH_SCENARIOS,
} from './data/evidenceFramework';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<NodeId>('disclosure');
  const [activeTrack, setActiveTrack] = useState<TrackId>('all');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedAscii, setCopiedAscii] = useState(false);

  const currentScenario = WALKTHROUGH_SCENARIOS.find(
    (s) => s.id === activeScenarioId
  );

  const activeNodeDetail = FRAMEWORK_NODES[selectedNode];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const handleTrackChange = (track: TrackId) => {
    setActiveScenarioId(null);
    setActiveTrack(track);
    if (track === 'extractive') {
      setSelectedNode('extractive');
    } else if (track === 'interpretive') {
      setSelectedNode('disclosure');
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    if (activeScenarioId === scenarioId) {
      setActiveScenarioId(null);
      setActiveTrack('all');
      return;
    }
    const scenario = WALKTHROUGH_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;
    setActiveScenarioId(scenarioId);
    setActiveTrack(scenario.classification);
    setSelectedNode(
      scenario.classification === 'extractive'
        ? 'traditional-admission'
        : 'disclosure'
    );
  };

  const handleCopyAscii = async () => {
    try {
      await navigator.clipboard.writeText(ASCII_BLUEPRINT);
      setCopiedAscii(true);
      setTimeout(() => setCopiedAscii(false), 2000);
    } catch {
      setCopiedAscii(false);
    }
  };

  const handleDownloadDiagram = () => {
    const link = document.createElement('a');
    link.href = GENERATED_DIAGRAM_URL;
    link.download = 'ai-evidence-admissibility-diagram.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gateNodes: NodeId[] = ['disclosure', 'reliability', 'provenance'];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          <a
            href="#diagram-plate"
            className="font-serif text-lg font-medium tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            AI Evidence Standard
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
          >
            <a
              href="#diagram-plate"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Diagram Plate
            </a>
            <a
              href="#interactive-flow"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Interactive Flow
            </a>
            <a
              href="#evidentiary-gates"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Evidentiary Gates
            </a>
            <a
              href="#source-schema"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Source Schema
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadDiagram}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FBF9F5] bg-[#1E3A8A] rounded-lg hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Diagram</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Section 1: Visual Diagram Plate & Curatorial Summary */}
        <section
          id="diagram-plate"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 border-b border-[#EBE6DF]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Editorial Exposition */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#57534E] tracking-wide">
                  <span>Evidentiary Architecture</span>
                  <span aria-hidden="true">·</span>
                  <span>Functional Classification</span>
                  <span aria-hidden="true">·</span>
                  <span>Three-Gate Pipeline</span>
                </div>

                <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight text-[#1C1917] text-balance">
                  Admissibility Framework for AI-Generated Evidence
                </h1>

                <p className="mt-5 text-base leading-relaxed text-[#44403C] max-w-2xl">
                  This visual schematic depicts how AI-derived exhibits are triaged
                  before entering the formal record. By separating verbatim{' '}
                  <strong className="font-semibold text-[#1C1917]">
                    extractive
                  </strong>{' '}
                  retrieval from probabilistic{' '}
                  <strong className="font-semibold text-[#1C1917]">
                    interpretive
                  </strong>{' '}
                  synthesis, courts assign the proper burden of proof and enforce
                  sequential validation across disclosure, reliability, and
                  provenance.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#FBF9F5] bg-[#1C1917] rounded-lg hover:bg-[#292524] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Inspect Full Plate</span>
                  </button>

                  <a
                    href="#interactive-flow"
                    className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-[#1C1917] bg-[#F4F0E8] border border-[#D6CEBE] rounded-lg hover:border-[#1C1917] transition-colors whitespace-nowrap shrink-0"
                  >
                    Explore Node Mechanics
                  </a>
                </div>
              </div>

              {/* Accession Definition List */}
              <dl className="mt-10 border-t border-[#D6CEBE] divide-y divide-[#EBE6DF]">
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <dt className="font-medium text-[#57534E]">Entry Gate</dt>
                  <dd className="sm:col-span-2 text-[#1C1917]">
                    AI Evidence intake routed to Function Classification
                  </dd>
                </div>
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <dt className="font-medium text-[#57534E]">Left Track</dt>
                  <dd className="sm:col-span-2 text-[#1C1917]">
                    Extractive tools proceed directly to Traditional Admission
                  </dd>
                </div>
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <dt className="font-medium text-[#57534E]">Right Track</dt>
                  <dd className="sm:col-span-2 text-[#1C1917]">
                    Interpretive models carry Burden of Proof across 3 gates
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right Column: Generated Infographic Plate */}
            <div className="lg:col-span-6 flex flex-col">
              <figure className="flex-1 flex flex-col bg-[#F4F0E8] border border-[#D6CEBE] rounded-xl p-4 sm:p-5">
                <div className="relative flex-1 min-h-[420px] rounded-lg overflow-hidden border border-[#EBE6DF] bg-[#FBF9F5] flex items-center justify-center">
                  {!imageError ? (
                    <>
                      <img
                        src={GENERATED_DIAGRAM_URL}
                        alt="AI Evidence Admissibility Flowchart Diagram showing Function Classification splitting into Extractive (Traditional Admission) and Interpretive (Burden of Proof) through Disclosure, Reliability, and Provenance to Admissible"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full h-full max-h-[620px] object-contain cursor-zoom-in transition-transform duration-200 hover:scale-[1.01]"
                      />
                      <button
                        type="button"
                        onClick={() => setIsLightboxOpen(true)}
                        aria-label="Zoom diagram image"
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#FBF9F5]/95 text-[#1C1917] border border-[#D6CEBE] rounded-md hover:border-[#1C1917] transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-3 text-[#57534E]">
                      <FileImage className="w-10 h-10 text-[#78716C]" />
                      <p className="text-sm font-medium text-[#1C1917]">
                        AI Evidence Admissibility Diagram Plate
                      </p>
                      <p className="text-xs max-w-xs">
                        Use the interactive flowchart below to inspect every stage
                        from Function Classification through Admissible.
                      </p>
                    </div>
                  )}
                </div>

                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                  <span className="font-serif italic">
                    Fig. 1 — Visual diagram of the AI Evidence functional
                    classification and three-gate admissibility pipeline
                  </span>
                  <span className="font-mono tabular-nums">Plate 01 · 3:4</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Flowchart & Functionality Inspector */}
        <section
          id="interactive-flow"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 border-b border-[#EBE6DF]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1917]">
                Interactive Functionality Explorer
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
                Select any node in the schematic or load a sample evidentiary
                scenario to trace how classification governs scrutiny.
              </p>
            </div>

            {/* Track Filter Controls */}
            <div
              role="group"
              aria-label="Filter diagram path"
              className="inline-flex items-center gap-1 p-1 bg-[#F4F0E8] border border-[#D6CEBE] rounded-lg self-start"
            >
              {(
                [
                  { id: 'all', label: 'All Paths' },
                  { id: 'extractive', label: 'Extractive' },
                  { id: 'interpretive', label: 'Interpretive' },
                ] as const
              ).map((tab) => {
                const active = activeTrack === tab.id && !activeScenarioId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTrackChange(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1C1917] text-[#FBF9F5]'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenario Walkthrough Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium text-[#57534E] mr-1">
              Test Exhibit:
            </span>
            {WALKTHROUGH_SCENARIOS.map((scenario) => {
              const isSelected = activeScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E3A8A] border-[#1E3A8A] text-[#FBF9F5]'
                      : 'bg-white border-[#D6CEBE] text-[#1C1917] hover:border-[#1E3A8A]'
                  }`}
                >
                  {scenario.title}
                </button>
              );
            })}
            {activeScenarioId && (
              <button
                type="button"
                onClick={() => {
                  setActiveScenarioId(null);
                  setActiveTrack('all');
                }}
                className="px-2.5 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
              >
                Reset
              </button>
            )}
          </div>

          {currentScenario && (
            <div className="mt-4 bg-[#F4F0E8] border border-[#D6CEBE] rounded-lg px-4 py-3 text-sm text-[#1C1917] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold">{currentScenario.title}</span>
                <span className="mx-2 text-[#78716C]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[#57534E]">
                  {currentScenario.artifactType}
                </span>
                <p className="mt-1 text-xs sm:text-sm text-[#44403C]">
                  {currentScenario.rationale}
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1E3A8A] font-medium whitespace-nowrap shrink-0">
                {currentScenario.classification === 'extractive'
                  ? 'Route: Traditional Admission'
                  : 'Route: Three-Gate Burden'}
              </span>
            </div>
          )}

          {/* Two-Zone Workbench */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <InteractiveFlowchart
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
                activeTrack={activeTrack}
                highlightedPath={currentScenario?.activeNodes}
              />
            </div>

            {/* Stage Inspector Panel */}
            <aside className="lg:col-span-5 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#EBE6DF]">
                <span className="font-mono text-xs font-medium text-[#1E3A8A] tabular-nums">
                  Stage {activeNodeDetail.index}
                </span>
                <span className="text-xs text-[#57534E]">
                  {activeNodeDetail.subtitle}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl font-medium text-[#1C1917]">
                {activeNodeDetail.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#44403C]">
                {activeNodeDetail.summary}
              </p>

              <div className="mt-5 p-4 bg-[#FBF9F5] border border-[#EBE6DF] rounded-lg">
                <div className="text-xs font-semibold text-[#1C1917]">
                  Operational Rule
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#44403C]">
                  {activeNodeDetail.operationalRule}
                </p>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold text-[#57534E] pb-2 border-b border-[#EBE6DF]">
                  Component Requirements
                </div>
                <ul className="divide-y divide-[#EBE6DF]">
                  {activeNodeDetail.subCriteria.map((item) => (
                    <li key={item.id} className="py-3.5">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#57534E] shrink-0">
                          {item.symbol}
                        </span>
                        <span className="text-sm font-semibold text-[#1C1917]">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-1 pl-6 text-xs leading-relaxed text-[#57534E]">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Section 3: Three-Gate Verification Stack */}
        <section
          id="evidentiary-gates"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 border-b border-[#EBE6DF]"
        >
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1917]">
              Three-Gate Interpretive Verification
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#57534E]">
              When AI evidence is classified as interpretive, the proponent must
              satisfy each sequential gate before admission is granted.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {gateNodes.map((nodeId, idx) => {
              const gate = FRAMEWORK_NODES[nodeId];
              return (
                <div
                  key={gate.id}
                  className="bg-white border border-[#D6CEBE] rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EBE6DF]">
                      <span className="font-mono text-xs font-medium text-[#57534E] tabular-nums">
                        0{idx + 1} / Gate {gate.index}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedNode(gate.id);
                          document
                            .getElementById('interactive-flow')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Inspect Node
                      </button>
                    </div>

                    <h3 className="mt-4 font-serif text-xl font-medium text-[#1C1917]">
                      {gate.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#44403C]">
                      {gate.summary}
                    </p>
                  </div>

                  <ul className="mt-6 pt-4 border-t border-[#EBE6DF] space-y-2.5">
                    {gate.subCriteria.map((sub) => (
                      <li
                        key={sub.id}
                        className="flex items-start gap-2.5 text-xs text-[#44403C]"
                      >
                        <span className="shrink-0 w-5 text-center" aria-hidden="true">
                          {sub.symbol}
                        </span>
                        <span>
                          <strong className="font-semibold text-[#1C1917]">
                            {sub.label}:
                          </strong>{' '}
                          {sub.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Source Schematic & Symbol Legend */}
        <section
          id="source-schema"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1917]">
                Source Diagram Blueprint
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#44403C]">
                The visual plate and interactive explorer are derived directly
                from the canonical ASCII decision tree. Copy the source text for
                legal briefs, technical documentation, or plaintext specs.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyAscii}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1C1917] bg-white border border-[#D6CEBE] rounded-lg hover:border-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedAscii ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#14532D]" />
                      <span>Copied Blueprint</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ASCII Diagram</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadDiagram}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1E3A8A] bg-[#F4F0E8] border border-[#D6CEBE] rounded-lg hover:border-[#1E3A8A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save High-Res Image</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#1C1917] text-[#FBF9F5] rounded-xl p-6 overflow-x-auto border border-[#292524]">
                <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
                  {ASCII_BLUEPRINT}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-[#EBE6DF] bg-[#F4F0E8]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
          <span>AI Evidence Admissibility Framework · Visual Plate & Explorer</span>
          <div className="flex items-center gap-6">
            <a href="#diagram-plate" className="hover:text-[#1C1917] transition-colors">
              Diagram Plate
            </a>
            <a href="#interactive-flow" className="hover:text-[#1C1917] transition-colors">
              Interactive Flow
            </a>
            <a href="#evidentiary-gates" className="hover:text-[#1C1917] transition-colors">
              Gates
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal for Full-Scale Plate Inspection */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full resolution AI Evidence Admissibility Diagram"
          className="fixed inset-0 z-50 bg-[#1C1917]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#FBF9F5] rounded-xl border border-[#D6CEBE] p-4 sm:p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#EBE6DF]">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  AI Evidence Admissibility Diagram
                </h3>
                <p className="text-xs text-[#57534E]">
                  High-resolution visual plate
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadDiagram}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#FBF9F5] bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close plate viewer"
                  className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-md hover:bg-[#F4F0E8] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex-1 min-h-0 flex items-center justify-center overflow-auto">
              <img
                src={GENERATED_DIAGRAM_URL}
                alt="Full resolution AI Evidence Admissibility Flowchart"
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-lg border border-[#EBE6DF]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
