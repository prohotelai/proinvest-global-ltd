import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * GET /api/v1/ppn/health
 * Simple health check endpoint for PPN services
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ppn',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
