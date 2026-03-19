import { NextResponse } from "next/server";
import { notifyAll } from "@/lib/notifications";

type AdmissionEnquiryBody = {
  studentName: string;
  className: string;
  medium: string;
  guardianName: string;
  guardianRelation: string;
  currentSchool?: string;
  mobileNumber: string;
};

function isValidPayload(body: AdmissionEnquiryBody): boolean {
  const required =
    body.studentName &&
    body.className &&
    body.medium &&
    body.guardianName &&
    body.guardianRelation &&
    body.mobileNumber;
  return Boolean(required) && /^\d{10}$/.test(body.mobileNumber);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AdmissionEnquiryBody;

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { ok: false, message: "Invalid admission enquiry payload." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const results = await notifyAll({
      event: "admission-enquiry",
      submittedAt,
      message: {
        title: "New Admission Enquiry",
        lines: [
          `Student Name: ${body.studentName}`,
          `Class: ${body.className}`,
          `Medium: ${body.medium}`,
          `Guardian Name: ${body.guardianName}`,
          `Guardian Relation: ${body.guardianRelation}`,
          `Current School: ${body.currentSchool || "-"}`,
          `Mobile Number: ${body.mobileNumber}`,
        ],
      },
      metadata: {
        source: "website-form",
      },
    });

    const anySuccess = results.some((r) => r.ok);
    return NextResponse.json(
      {
        ok: anySuccess,
        results,
      },
      { status: anySuccess ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to send notifications.",
      },
      { status: 500 }
    );
  }
}
