# Risk–Opportunity Heatmap App PRD Review

## Executive Summary
The PRD articulates a compelling collaborative risk management experience with strong emphasis on real-time visualization and facilitation flows. The scope is ambitious for an MVP, combining complex real-time collaboration, AI-assisted scoring, and export workflows. To hit the proposed five-week timeline, the team should tighten prioritization, clarify success criteria for AI features, and solidify real-time and security architecture decisions.

## Major Strengths
- **Clear business problem and personas:** The facilitator/participant/observer roles align well with meeting dynamics and justify collaboration-first decisions.
- **Comprehensive feature set:** Captures inputs, visualization, voting, exports, and AI assistance in one flow, outlining a differentiated product vs. spreadsheets.
- **Thoughtful UX guidance:** Mobile-first, accessible palette, and meeting-centric interaction patterns show awareness of real-world usage contexts.

## Key Risks & Concerns
1. **Timeline Feasibility:** Delivering real-time collaboration, voting, exports, and AI auto-scoring within five weeks is aggressive for a new codebase. Even with a focused team, integrating sockets, persistence, AI prompt engineering, and export rendering will likely exceed the schedule.
2. **AI Auto-Scoring Definition:** The PRD expects >60% acceptance of AI suggestions but lacks prompt design, fallback behavior, or data privacy considerations. Clarify data sent to OpenAI, handling of rejected suggestions, and how AI confidence is surfaced.
3. **Real-Time Architecture:** The document lists Socket.IO / Supabase / Pusher interchangeably. Selecting and validating one provider early is critical for latency (<300 ms) and concurrency (100+ users). Session isolation and reconnection handling need specification.
4. **Security & Compliance:** Session tokens, anonymous mode, profanity filtering, and rate limiting are mentioned but not detailed. Requirements for JWT signing, storage of facilitator privileges, and audit logging remain open.
5. **Export Reliability:** Exporting to PNG/PDF with accurate timestamps under meeting conditions is non-trivial. Need to define whether rendering happens server-side (e.g., Puppeteer) or client-side and how to ensure deterministic visuals.
6. **Testing Expectations:** “Tests required for all endpoints (Vitest)” implies a sizable test surface. Define minimal critical-path tests to avoid slowing delivery.

## Open Questions
- What is the expected scale per session (entries, participants) to size database and realtime throughput?
- How are votes limited/enforced across devices (e.g., per participant ID vs. per auth token)?
- What is the offline story if a participant temporarily loses connectivity?
- Are there compliance constraints for storing meeting data (retention policies, data residency)?
- Should AI features be optional per session, and how is user consent captured for sharing descriptions with OpenAI?

## Recommendations
1. **Re-scope MVP:** Focus Weeks 1–4 on session CRUD, real-time heatmap, and voting. Defer AI auto-scoring and export to a follow-up milestone unless additional resources are available.
2. **Decide Real-Time Stack Upfront:** Pick Socket.IO (self-hosted) or Supabase Realtime and document reconnect/backfill flows, event versioning, and optimistic UI strategy.
3. **Define AI Interaction Flow:** Draft prompt templates, add confidence scoring UI, and specify guardrails (length limits, profanity handling) before implementation.
4. **Detail Security Model:** Document JWT payloads, facilitator permissions, anonymous participant identifiers, and rate-limit thresholds. Plan for session invalidation and rotation.
5. **Export Strategy Spike:** Schedule a technical spike to validate html-to-image approach (e.g., using `html-to-image` client-side plus download) vs. server rendering with Playwright, ensuring accessibility colors and legend remain intact.
6. **Testing Priorities:** Start with contract tests for session lifecycle, entry CRUD, and voting rules. Supplement with integration tests for real-time updates once architecture is chosen.

## Suggested Next Steps
- Conduct architecture workshop to choose realtime provider, deployment targets, and AI integration flow.
- Produce sequence diagrams for the core facilitator journey (create session → live updates → voting → export).
- Create a shared glossary of key terms (session, entry, participant) to align API, UI, and analytics.
- Validate color palette and marker shapes with accessibility tooling early to avoid late-stage rework.

