export type NodeId =
  | 'ai-evidence'
  | 'classification'
  | 'extractive'
  | 'traditional-admission'
  | 'interpretive'
  | 'burden-of-proof'
  | 'disclosure'
  | 'reliability'
  | 'provenance'
  | 'admissible';

export type TrackId = 'all' | 'extractive' | 'interpretive';

export interface SubCriterion {
  id: string;
  symbol: string;
  label: string;
  detail: string;
}

export interface FrameworkNode {
  id: NodeId;
  index: string;
  title: string;
  subtitle: string;
  track: 'shared' | 'extractive' | 'interpretive';
  summary: string;
  operationalRule: string;
  subCriteria: SubCriterion[];
}

export interface WalkthroughScenario {
  id: string;
  title: string;
  artifactType: string;
  classification: 'extractive' | 'interpretive';
  activeNodes: NodeId[];
  rationale: string;
}

export const GENERATED_DIAGRAM_URL =
  '/src/assets/images/ai_evidence_admissibility_diagram_1795026635047.jpg';

export const ASCII_BLUEPRINT = `      🤖📄
 AI EVIDENCE
      │
      ▼
      🚦
FUNCTION CLASSIFICATION
   ┌─────┴─────┐
   │           │
  🔍          🧠
Extractive  Interpretive
   │           │
Traditional   ▼
Admission  ⚖️ Burden of
            Proof
              │
              ▼
      ┌───────────┐
      │    📋     │
      │DISCLOSURE │
      │📑🏷️✅⚖️  │
      └─────┬─────┘
            ▼
      ┌───────────┐
      │    🎯     │
      │RELIABILITY│
      │🎯📉🔄💡  │
      └─────┬─────┘
            ▼
      ┌───────────┐
      │    🔗     │
      │PROVENANCE │
      │⛓️🔐📝♻️  │
      └─────┬─────┘
            ▼
           ✅
      ADMISSIBLE`;

export const FRAMEWORK_NODES: Record<NodeId, FrameworkNode> = {
  'ai-evidence': {
    id: 'ai-evidence',
    index: '01',
    title: 'AI Evidence',
    subtitle: 'Automated Artifact Intake',
    track: 'shared',
    summary:
      'Any document, log, analytical output, or digital exhibit generated or transformed by an artificial intelligence system offered into a formal record.',
    operationalRule:
      'Before evidentiary weight is assessed, the artifact enters functional triage to determine whether the model retrieved existing facts or synthesized new inferences.',
    subCriteria: [
      {
        id: 'artifact-intake',
        symbol: '01.1',
        label: 'System Output Capture',
        detail: 'Preserves raw model outputs, prompts, parameters, and accompanying exhibit files at intake.',
      },
      {
        id: 'context-tag',
        symbol: '01.2',
        label: 'Procedural Posture',
        detail: 'Identifies the offering party, intended factual proposition, and scope of reliance.',
      },
    ],
  },
  classification: {
    id: 'classification',
    index: '02',
    title: 'Function Classification',
    subtitle: 'Bifurcation Decision Gate',
    track: 'shared',
    summary:
      'Separates deterministic or verbatim extraction tasks from probabilistic interpretation, determining the governing admissibility standard.',
    operationalRule:
      'Systems that strictly locate or format existing source material proceed under traditional rules; systems that infer, score, or reconstruct facts trigger heightened scrutiny.',
    subCriteria: [
      {
        id: 'extractive-test',
        symbol: '02.1',
        label: 'Extractive Threshold',
        detail: 'Output is directly verifiable against an unchanged underlying source without probabilistic inference.',
      },
      {
        id: 'interpretive-test',
        symbol: '02.2',
        label: 'Interpretive Threshold',
        detail: 'Output introduces judgment, classification, synthesis, prediction, or probabilistic scoring.',
      },
    ],
  },
  extractive: {
    id: 'extractive',
    index: '03A',
    title: 'Extractive Function',
    subtitle: 'Verbatim & Deterministic Retrieval',
    track: 'extractive',
    summary:
      'Tools that index, transcribe, parse, or surface existing record entries without altering underlying meaning or drawing novel conclusions.',
    operationalRule:
      'Because human reviewers can directly compare output against the original source document, error detection remains transparent.',
    subCriteria: [
      {
        id: 'direct-correspondence',
        symbol: '03A.1',
        label: 'Source Correspondence',
        detail: 'Every extracted span maps one-to-one to a verifiable location in the primary record.',
      },
      {
        id: 'low-epistemic-risk',
        symbol: '03A.2',
        label: 'Minimal Inference Drift',
        detail: 'No ungrounded generation, extrapolation, or probabilistic weighting is introduced.',
      },
    ],
  },
  'traditional-admission': {
    id: 'traditional-admission',
    index: '04A',
    title: 'Traditional Admission',
    subtitle: 'Standard Authentication Rules',
    track: 'extractive',
    summary:
      'Evaluated under established rules of authentication, relevance, and best-evidence standards without requiring bespoke algorithmic foundation.',
    operationalRule:
      'A sponsoring witness or foundational affidavit showing accurate retrieval and intact source correspondence satisfies admission requirements.',
    subCriteria: [
      {
        id: 'authentication',
        symbol: '04A.1',
        label: 'Foundation & Relevance',
        detail: 'Demonstrates that the exhibit accurately reproduces the underlying record it purports to represent.',
      },
      {
        id: 'adversarial-check',
        symbol: '04A.2',
        label: 'Direct Inspection',
        detail: 'Opposing counsel can cross-check the extracted item directly against the raw source artifact.',
      },
    ],
  },
  interpretive: {
    id: 'interpretive',
    index: '03B',
    title: 'Interpretive Function',
    subtitle: 'Inference, Synthesis & Scoring',
    track: 'interpretive',
    summary:
      'Models that evaluate patterns, generate narrative summaries, assign confidence scores, or infer unstated facts from complex inputs.',
    operationalRule:
      'Because internal weights and latent representations cannot be cross-examined like a human witness, interpretive outputs require formal foundation.',
    subCriteria: [
      {
        id: 'probabilistic-claim',
        symbol: '03B.1',
        label: 'Epistemic Opacity',
        detail: 'Outputs depend on statistical correlations, learned weights, or generative synthesis.',
      },
      {
        id: 'expert-equivalent',
        symbol: '03B.2',
        label: 'Analytical Weight',
        detail: 'Functions analogously to expert opinion or specialized technical instrumentation.',
      },
    ],
  },
  'burden-of-proof': {
    id: 'burden-of-proof',
    index: '04B',
    title: 'Burden of Proof',
    subtitle: 'Proponent Evidentiary Threshold',
    track: 'interpretive',
    summary:
      'The offering party bears the affirmative burden of establishing disclosure, methodological reliability, and continuous provenance before admission.',
    operationalRule:
      'Failure at any of the three sequential verification gates prevents interpretive AI evidence from reaching the fact-finder.',
    subCriteria: [
      {
        id: 'affirmative-duty',
        symbol: '04B.1',
        label: 'Proponent Responsibility',
        detail: 'The party introducing interpretive AI output must substantiate its validity rather than shifting audit costs.',
      },
      {
        id: 'sequential-gates',
        symbol: '04B.2',
        label: 'Three-Gate Sequence',
        detail: 'Requires passing Disclosure, Reliability, and Provenance in order.',
      },
    ],
  },
  disclosure: {
    id: 'disclosure',
    index: '05',
    title: 'Disclosure',
    subtitle: 'Notice, Labeling & Specification',
    track: 'interpretive',
    summary:
      'Mandates transparent notice that AI produced or altered the evidence, paired with technical documentation sufficient for independent scrutiny.',
    operationalRule:
      'Gate 1 clears only when the model identity, configuration, prompt/input boundaries, and legal notice obligations are formally documented.',
    subCriteria: [
      {
        id: 'disc-docs',
        symbol: '📑',
        label: 'System Documentation',
        detail: 'Model architecture, version identifier, training domain boundaries, and operating parameters.',
      },
      {
        id: 'disc-labeling',
        symbol: '🏷️',
        label: 'Explicit AI Attribution',
        detail: 'Clear labeling distinguishing machine-synthesized assertions from human-authored records.',
      },
      {
        id: 'disc-checklist',
        symbol: '✅',
        label: 'Pre-Trial Verification',
        detail: 'Completion of mandatory procedural checklists and timely discovery production.',
      },
      {
        id: 'disc-fairness',
        symbol: '⚖️',
        label: 'Fair Notice & Equality',
        detail: 'Ensures opposing parties possess equal access to test assumptions and challenge scope.',
      },
    ],
  },
  reliability: {
    id: 'reliability',
    index: '06',
    title: 'Reliability',
    subtitle: 'Accuracy, Error Bounds & Explainability',
    track: 'interpretive',
    summary:
      'Tests whether the interpretive methodology produces trustworthy, repeatable results with bounded and disclosed error rates in the target domain.',
    operationalRule:
      'Gate 2 mirrors scientific validity standards: demonstrated accuracy, quantified error profiles, reproducibility, and intelligible reasoning.',
    subCriteria: [
      {
        id: 'rel-accuracy',
        symbol: '🎯',
        label: 'Task Accuracy & Fit',
        detail: 'Empirical validation showing the model performs reliably on data representative of the case.',
      },
      {
        id: 'rel-error',
        symbol: '📉',
        label: 'Error Rate & Uncertainty',
        detail: 'Measured false-positive, false-negative, and hallucination distributions under stress.',
      },
      {
        id: 'rel-repeat',
        symbol: '🔄',
        label: 'Reproducibility',
        detail: 'Consistent outputs under controlled re-execution with fixed seeds and logged parameters.',
      },
      {
        id: 'rel-explain',
        symbol: '💡',
        label: 'Explainable Reasoning',
        detail: 'Inspectable rationale, feature attribution, or source grounding linking input to conclusion.',
      },
    ],
  },
  provenance: {
    id: 'provenance',
    index: '07',
    title: 'Provenance',
    subtitle: 'Chain of Custody & Integrity',
    track: 'interpretive',
    summary:
      'Establishes an unbroken, tamper-evident record from raw input ingestion through model execution to final courtroom presentation.',
    operationalRule:
      'Gate 3 ensures the artifact has not been altered, cherry-picked, or corrupted across storage, transformation, or model updates.',
    subCriteria: [
      {
        id: 'prov-chain',
        symbol: '⛓️',
        label: 'Chain of Custody',
        detail: 'Continuous custody log documenting every custodian, pipeline hop, and post-processing step.',
      },
      {
        id: 'prov-crypto',
        symbol: '🔐',
        label: 'Cryptographic Integrity',
        detail: 'SHA-256 digests, signed timestamps, or C2PA manifests binding inputs to outputs.',
      },
      {
        id: 'prov-audit',
        symbol: '📝',
        label: 'Immutable Audit Trail',
        detail: 'Append-only execution logs capturing raw prompts, system prompts, and intermediate states.',
      },
      {
        id: 'prov-lifecycle',
        symbol: '♻️',
        label: 'Lifecycle Traceability',
        detail: 'Tracks model checkpoints, fine-tuning lineage, and retention compliance over time.',
      },
    ],
  },
  admissible: {
    id: 'admissible',
    index: '08',
    title: 'Admissible',
    subtitle: 'Cleared for Evidentiary Record',
    track: 'interpretive',
    summary:
      'Having satisfied Disclosure, Reliability, and Provenance under the proponent’s burden of proof, the interpretive AI evidence is cleared for admission.',
    operationalRule:
      'Admissibility permits consideration by the trier of fact; weight and credibility remain subject to cross-examination and competing evidence.',
    subCriteria: [
      {
        id: 'adm-record',
        symbol: '08.1',
        label: 'Threshold Clearance',
        detail: 'All three verification gates passed with documented foundation entered into the record.',
      },
      {
        id: 'adm-weight',
        symbol: '08.2',
        label: 'Fact-Finder Evaluation',
        detail: 'Disclosed limitations and error bounds travel alongside the exhibit to inform weight.',
      },
    ],
  },
};

export const WALKTHROUGH_SCENARIOS: WalkthroughScenario[] = [
  {
    id: 'ocr-extract',
    title: 'Scanned Contract OCR Extraction',
    artifactType: 'Text Parsing',
    classification: 'extractive',
    activeNodes: [
      'ai-evidence',
      'classification',
      'extractive',
      'traditional-admission',
    ],
    rationale:
      'The model transcribes visible characters directly from a preserved PDF scan. Because the output is verbatim and verifiable line-by-line against the original image, it follows Traditional Admission.',
  },
  {
    id: 'biometric-score',
    title: 'Forensic Voice Similarity Score',
    artifactType: 'Probabilistic Classification',
    classification: 'interpretive',
    activeNodes: [
      'ai-evidence',
      'classification',
      'interpretive',
      'burden-of-proof',
      'disclosure',
      'reliability',
      'provenance',
      'admissible',
    ],
    rationale:
      'The system computes an inferred likelihood ratio from acoustic embeddings. The proponent must carry the Burden of Proof through Disclosure, Reliability, and Provenance before the score is Admissible.',
  },
  {
    id: 'llm-synthesis',
    title: 'LLM Chronological Incident Summary',
    artifactType: 'Generative Synthesis',
    classification: 'interpretive',
    activeNodes: [
      'ai-evidence',
      'classification',
      'interpretive',
      'burden-of-proof',
      'disclosure',
      'reliability',
      'provenance',
      'admissible',
    ],
    rationale:
      'Summarizing thousands of emails introduces interpretive selection and phrasing choices. It must pass explicit AI labeling, hallucination error bounds, and prompt/output audit provenance.',
  },
];
