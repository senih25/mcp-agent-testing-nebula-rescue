# Testing and verifiable evidence

## Run the independent Node.js tests

From the public repository root:

~~~sh
node --test tests/logic.test.cjs tests/release-integrity.test.cjs
~~~

The original suite includes 16 domain-logic tests covering exhibit search, filtering, invalid inputs, arithmetic, inventory and synthetic fixtures. The additional static-release tests inspect GitHub Pages paths, iframe destinations, packaged resources and disclosure checks.

## Re-run real browser assertions

Open [the restored museum](../museum.html), locate **RECOVERY EVIDENCE** and click **RUN LIVE CHECKS**. This executes 29 client-side assertions and renders actual per-test PASS/FAIL results.

The presentation's [EVIDENCE stage](../index.html?stage=evidence) shows **historical** test observations preserved from the local repair; those displayed numbers do not imply a fresh run on every page load.

## Initial failure and correction are preserved

- All four synthetic defects were reproduced through real browser interactions.
- The first local-file browser suite passed **28/29**. The failing test attempted to inspect CSSOM stylesheet rules under local-file browser restrictions.
- The test harness was changed to check active reduced-motion behavior at runtime; the same suite then passed **29/29**.
- The separate Node.js logic suite passed **16/16**.
- AFTER integration checks passed **12/12**, BEFORE/AFTER integration checks passed **8/8**, and a deliberately misrouted iframe was recovered by bounded destination validation.
- Manual search, reservation, guide Space-key activation, invalid input, feed interruption and restoration all passed in the repaired site.
- Four emulated viewport configurations were tested without observed document overflow. These are not physical-device tests.

## Preserved local-run artifacts

The `evidence/` folder holds reviewed synthetic-only baseline measurements, browser assertion results, responsive matrix and Node.js TAP output. Its contents originate from actual local execution and were not rewritten as fictional test logs for publication.

These outcomes do not constitute security certification, comprehensive WCAG conformance, a production uptime guarantee or independent laboratory accreditation. A prior Lighthouse snapshot had three failed audits that were not individually certified as resolved.
