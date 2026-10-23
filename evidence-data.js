/* Generated from real guarded execution results. No private paths or URLs. */
window.NebulaEvidence = {
  "classification": "SYNTHETIC PUBLIC DEMONSTRATION",
  "source": "PBT-G browser + Node built-in tests",
  "baseline": {
    "ranAt": "2026-10-23T23:16:17.118Z",
    "reproduced": 4,
    "defects": [
      {
        "id": "F01",
        "title": "Search returned the wrong exhibits",
        "before": "Search \"crystal\": 0 results instead of 1.",
        "cause": "A case-sensitive, name-only string check excluded valid exhibits.",
        "repair": "Normalized, case-insensitive search covers names, descriptions, zones and tags."
      },
      {
        "id": "F02",
        "title": "Reservation inventory increased",
        "before": "Booking 2: 20 available instead of 16.",
        "cause": "Confirmed bookings added the quantity to availability.",
        "repair": "Validated integer capacity and subtracted reservations; credits are synthetic."
      },
      {
        "id": "F03",
        "title": "Mobile layout overflowed",
        "before": "At a configured 390px mobile viewport, the document measured 1121px.",
        "cause": "Prototype container had a fixed 1120px minimum width.",
        "repair": "Removed rigid widths; flexible grids and breakpoint layouts fit the active viewport."
      },
      {
        "id": "F04",
        "title": "Guide control was inert",
        "before": "After clicking, the display still read \"Guide is off.\".",
        "cause": "The event listener targeted an element that was not in the DOM.",
        "repair": "The real guide button now toggles captions, state and ARIA-pressed."
      }
    ]
  },
  "browser": {
    "ranAt": "2026-10-23T23:16:35.589Z",
    "total": 29,
    "passed": 29,
    "failed": 0,
    "status": "PASS",
    "results": [
      {
        "id": "T01",
        "name": "Lowercase exhibit search",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T02",
        "name": "Mixed-case normalized search",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T03",
        "name": "Tag search finds a world",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T04",
        "name": "Category filter isolates cosmic",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T05",
        "name": "Combined search and category",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T06",
        "name": "No-match state is safe",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T07",
        "name": "Invalid search value rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T08",
        "name": "Invalid zone rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T09",
        "name": "Missing feed is a safe error",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T10",
        "name": "Reservation subtracts two seats",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T11",
        "name": "Reservation arithmetic is exact",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T12",
        "name": "Repeated reservations consistent",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T13",
        "name": "Blank guest count rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T14",
        "name": "Fractional guest count rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T15",
        "name": "Negative guest count rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T16",
        "name": "Maximum guest count enforced",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T17",
        "name": "Excess reservation rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T18",
        "name": "Invalid inventory rejected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T19",
        "name": "Invalid quote is not calculated",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T20",
        "name": "Guide toggle updates UI state",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T21",
        "name": "Outage and recovery path work",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T22",
        "name": "Exhibit details open and close",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T23",
        "name": "Document fits viewport",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T24",
        "name": "Controls have accessible names",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T25",
        "name": "No third-party resources linked",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T26",
        "name": "Active motion preference is respected",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T27",
        "name": "Synthetic disclosure visible",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T28",
        "name": "Search input interacts with UI",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      },
      {
        "id": "T29",
        "name": "Booking control updates inventory",
        "ok": true,
        "status": "PASS",
        "detail": "Assertion satisfied"
      }
    ],
    "environment": {
      "page": "NEBULA repaired synthetic site",
      "logicalViewport": 390,
      "clientWidth": 390,
      "documentWidth": 390,
      "visualViewport": 390,
      "mobileWidthFits": true
    }
  },
  "node": {
    "passed": 16,
    "failed": 0,
    "total": 16
  },
  "notes": [
    "Initial browser suite: 28/29; the original CSSOM source-inspection assertion could not read stylesheet rules on a local file page.",
    "Adjusted T26 to check active browser motion preference at runtime; CSS reduced-motion rule confirmed independently in source.",
    "After rerun: 29/29 browser assertions passed. Physical device testing and a complete publication review remain outstanding."
  ]
};
