# OPERATION NEBULA RESCUE
### An AI agent diagnoses and repairs a completely fictional digital museum

**NEBULA — Museum of Tomorrow** is an original synthetic museum created exclusively for a browser-and-terminal repair demonstration. Four defects were **intentionally seeded**; they were not discovered at a real museum.

**[Launch the interactive BEFORE / AFTER demo](https://senih25.github.io/mcp-agent-testing-nebula-rescue/)** | [Restored museum](https://senih25.github.io/mcp-agent-testing-nebula-rescue/museum.html) | [Testing methodology](docs/TESTING.md)

## Explore the real interactive comparison

The presentation offers **BEFORE → AFTER → EVIDENCE → COMPARE**. Each frame contains a working page, not a screenshot.

1. **BEFORE:** Search for `crystal` (incorrectly finds none), reserve two simulated seats (availability increases incorrectly), or activate the intentionally inert guide. The prototype deliberately overflows at mobile widths.
2. **AFTER:** The same query correctly finds Crystal Nursery. Booking two simulated seats reduces availability from 18 to 16, for 56 imaginary credits. Guide captions, filtering, and exhibit cards work.
3. **Resilience:** Click **SIMULATE FEED INTERRUPTION**, inspect the explicit error, and click **RESTORE EXHIBIT FEED** to recover.
4. **Live tests:** Click **RUN LIVE CHECKS** inside the restored museum to run 29 in-page assertions with individual PASS/FAIL rows.
5. **COMPARE:** See the actual before and after pages together. Neither iframe embeds the presentation recursively.

No payments, real visitors, accounts, analytics, third-party media or external APIs are used. All artwork, astronomical worlds, exhibit names and ticket values are imaginary.

## Executed evidence from the local rescue

| Test group | Verified result |
| --- | --- |
| Synthetic defects reproduced | 4 of 4 |
| Final original browser assertions | 29/29 passed |
| Separate Node.js domain tests | 16/16 passed |
| Presentation AFTER integration checks | 12/12 passed |
| BEFORE/AFTER comparison checks | 8/8 passed |
| Deliberate iframe misnavigation and recovery | Passed |
| Narrow mobile emulation | No unintentional document overflow observed |
| **Initial browser harness** | **28/29** before a documented test correction |

These are previously executed local-test results, **not fabricated logs, production benchmarks, security certification, or proof of complete WCAG compliance**. The presentation's EVIDENCE tab displays preserved results; the museum button executes a fresh in-browser test run.

## Independent GPT review and repair

A reported **independent GPT read-only review** identified a critical issue: the AFTER frame declared the museum as its source yet actually loaded the presentation. The primary agent **independently reproduced** the mismatch by inspecting the real frame URL, document title, network requests and source.

The restored museum's comparison link lacked a top-level navigation target, allowing the presentation to replace the museum iframe. The correction uses `target="_top"` plus a bounded frame-destination check that retries once and reports recurring mismatches. The exact initiating click was not recorded, so its identity is not presented as proven. See [the technical quality gate](docs/QUALITY_GATE.md).

## Local test reproduction

Only the existing Node.js runtime is needed; there is no package installation or build process.

~~~sh
node --test tests/logic.test.cjs tests/release-integrity.test.cjs
~~~

Serve this repository's root with any basic static web server, then open `index.html`. GitHub Pages does this automatically. The application has no backend, no persistent visitor record, and no payment endpoint.

## Read before reuse

A public GitHub repository is **not automatically open-source licensed**. The owner authorized publication of the reviewed synthetic source but **no downstream reuse license has been granted**. See [source and asset rights](docs/SOURCE_AND_ASSETS.md).

The separate screen recording is **not included and has not been approved for publication**. Browser emulation is not physical-device certification. The earlier Lighthouse snapshot reported three failing audits outside the categories that scored 100.

[Tests and evidence](docs/TESTING.md) | [Independent review](docs/QUALITY_GATE.md) | [Security and privacy](docs/SECURITY_AND_PRIVACY.md) | [Source rights](docs/SOURCE_AND_ASSETS.md)

*This fictional project is not affiliated with any real museum or similarly named organization.*
