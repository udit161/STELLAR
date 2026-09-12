from pathlib import Path
from typing import Any, Dict, List

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib import colors


REPORT_DIR = (
    Path(__file__).resolve().parent.parent
    / "uploads"
    / "reports"
)

REPORT_DIR.mkdir(parents=True, exist_ok=True)


def generate_audit_report(
    job_id: str,
    query: Dict[str, Any],
    execution_events: List[Dict[str, Any]],
    artifacts: List[Dict[str, Any]],
    output_path: str | None = None,
) -> Dict[str, Any]:
    """
    Generate a PDF audit report for a SatQuery AI job.
    """

    if output_path is None:
        output_path = str(
            REPORT_DIR / f"audit_report_{job_id}.pdf"
        )

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "SatQuery AI - Analysis Audit Report",
            styles["Title"],
        )
    )

    story.append(Spacer(1, 15))

    story.append(
        Paragraph(
            f"<b>Job ID:</b> {job_id}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>Query:</b> {query.get('query_text', '')}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>Status:</b> {query.get('status', '')}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>User ID:</b> {query.get('user_id') or 'N/A'}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>Session ID:</b> {query.get('session_id') or 'N/A'}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>Started:</b> {query.get('started_at', '')}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            f"<b>Completed:</b> {query.get('completed_at') or 'N/A'}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 20))

    # Execution trace section
    story.append(
        Paragraph(
            "Execution Trace",
            styles["Heading2"],
        )
    )

    story.append(Spacer(1, 8))

    trace_data = [
        ["Event", "Status", "Message", "Time"]
    ]

    for event in execution_events:
        trace_data.append(
            [
                str(event.get("event_type", "")),
                str(event.get("status", "")),
                str(event.get("message", "")),
                str(event.get("created_at", "")),
            ]
        )

    trace_table = Table(
        trace_data,
        repeatRows=1,
        colWidths=[90, 70, 190, 100],
    )

    trace_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(trace_table)

    story.append(Spacer(1, 20))

    # Artifacts section
    story.append(
        Paragraph(
            "Generated Artifacts",
            styles["Heading2"],
        )
    )

    story.append(Spacer(1, 8))

    if artifacts:
        artifact_data = [
            ["Type", "Filename", "Path"]
        ]

        for artifact in artifacts:
            artifact_data.append(
                [
                    str(
                        artifact.get(
                            "artifact_type",
                            "",
                        )
                    ),
                    str(
                        artifact.get(
                            "filename",
                            "",
                        )
                    ),
                    str(
                        artifact.get(
                            "file_path",
                            "",
                        )
                    ),
                ]
            )

        artifact_table = Table(
            artifact_data,
            repeatRows=1,
            colWidths=[100, 130, 220],
        )

        artifact_table.setStyle(
            TableStyle(
                [
                    (
                        "BACKGROUND",
                        (0, 0),
                        (-1, 0),
                        colors.lightgrey,
                    ),
                    (
                        "GRID",
                        (0, 0),
                        (-1, -1),
                        0.5,
                        colors.grey,
                    ),
                    (
                        "VALIGN",
                        (0, 0),
                        (-1, -1),
                        "TOP",
                    ),
                    (
                        "FONTSIZE",
                        (0, 0),
                        (-1, -1),
                        7,
                    ),
                ]
            )
        )

        story.append(artifact_table)

    else:
        story.append(
            Paragraph(
                "No artifacts were generated.",
                styles["Normal"],
            )
        )

    story.append(Spacer(1, 20))

    if query.get("error"):
        story.append(
            Paragraph(
                f"<b>Error:</b> {query['error']}",
                styles["Normal"],
            )
        )

    document.build(story)

    return {
        "path": str(output),
        "format": "pdf",
        "job_id": job_id,
    }