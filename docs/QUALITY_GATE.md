# Independent review and final presentation quality gate

## Presentation failure identified

A separately reported independent GPT read-only review observed that the AFTER iframe targeted the restored museum but actually displayed the presentation page. The primary execution agent subsequently reproduced this through active browser readback, confirming the mismatch, incorrect title, missing museum application and a network sequence in which the museum loaded before the reveal page.

## Confirmed cause and correction

The museum contained a comparison link with no explicit target. Inside an iframe, following that link can replace the museum with the reveal page. That containment flaw was confirmed in source. The exact original triggering action was not retained and is **not presented as established fact**.

Two targeted repairs were made: the comparison link now navigates the **top-level page**, and the presentation verifies actual iframe destinations with a single bounded recovery attempt. A persistent mismatch produces a visible failure state.

For GitHub Pages, the public presentation starts at `index.html` and the separate restored museum is `museum.html`. The presentation's iframe sources and destination checks consistently use relative `./museum.html` URLs, so they function beneath a project-repository subpath.

## Executed verification

| Check | Outcome |
| --- | --- |
| Live BEFORE: search for crystal | 0 results (intentionally broken) |
| Live AFTER: same query | 1 correct result |
| Live BEFORE: reserve two | 18 → 20 (intentionally incorrect) |
| Live AFTER: reserve two | 18 → 16, 56 imaginary credits |
| Guide click and Space activation | Passed |
| Feed-outage and restoration | Passed |
| Local browser assertion suite | 29/29 passed |
| Independent Node.js suite | 16/16 passed |
| AFTER integration | 12/12 passed |
| Comparison integration | 8/8 passed |
| Off-screen forced frame misrouting | Recovery passed |

The initial **28/29** harness failure and correction remain disclosed.

## What the review does not establish

The term "independent GPT review" describes the independently reported inspection, whose finding was subsequently confirmed by the primary agent. It does **not** mean external security certification, a formal accessibility audit, a test of physical devices, or review of the entire screen recording.

An exploratory browser `fetch` diagnostic was blocked by the page's `connect-src 'none'` Content Security Policy. Those console messages were browser CSP enforcement, not evidence of a PBT-G Guard denial. The policy was not weakened.

Public release authorization applies to the reviewed static demonstration only; the video and its narration/subtitles were **not** approved for release.
