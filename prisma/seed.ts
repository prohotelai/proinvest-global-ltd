// Seed script for ProInvest Partner Network (PPN)
// Run with: npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts

import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create tiers
  console.log('Creating tiers...');
  const tiers = await Promise.all([
    prisma.tier.upsert({
      where: { name: 'Starter' },
      update: {},
      create: { name: 'Starter', description: 'Entry level partner tier', sortOrder: 0 },
    }),
    prisma.tier.upsert({
      where: { name: 'Pro' },
      update: {},
      create: { name: 'Pro', description: 'Active partners with consistent performance', sortOrder: 1 },
    }),
    prisma.tier.upsert({
      where: { name: 'Elite' },
      update: {},
      create: { name: 'Elite', description: 'Top performing partners', sortOrder: 2 },
    }),
    prisma.tier.upsert({
      where: { name: 'Strategic' },
      update: {},
      create: { name: 'Strategic', description: 'Enterprise partnership tier', sortOrder: 3 },
    }),
  ]);
  console.log(`  ✓ Created ${tiers.length} tiers`);

  // Create admin user
  console.log('Creating admin user...');
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@proinvest.global' },
    update: {},
    create: {
      email: 'admin@proinvest.global',
      passwordHash: adminPasswordHash,
      name: 'PPN Admin',
      role: 'admin',
    },
  });
  console.log(`  ✓ Admin user: admin@proinvest.global / admin123`);

  // Create products
  console.log('Creating products...');
  const proHotelAI = await prisma.product.upsert({
    where: { slug: 'prohotelai' },
    update: {},
    create: {
      name: 'ProHotelAI',
      slug: 'prohotelai',
      domain: 'prohotelai.com',
      webhookSecret: 'whsec_prohotelai_test_secret_key_12345',
      defaultLandingUrl: 'https://prohotelai.com',
      pricingUrl: 'https://prohotelai.com/pricing',
      status: 'active',
    },
  });

  const proCafeAI = await prisma.product.upsert({
    where: { slug: 'procafeai' },
    update: {},
    create: {
      name: 'ProCafeAI',
      slug: 'procafeai',
      domain: 'procafeai.com',
      webhookSecret: 'whsec_procafeai_test_secret_key_12345',
      defaultLandingUrl: 'https://procafeai.com',
      pricingUrl: 'https://procafeai.com/pricing',
      status: 'active',
    },
  });
  console.log(`  ✓ Created products: ProHotelAI, ProCafeAI`);

  // Create product plans
  console.log('Creating product plans...');
  await prisma.productPlan.createMany({
    data: [
      { productId: proHotelAI.id, planKey: 'starter', name: 'Starter', billingCycle: 'monthly' },
      { productId: proHotelAI.id, planKey: 'starter', name: 'Starter Annual', billingCycle: 'annual' },
      { productId: proHotelAI.id, planKey: 'professional', name: 'Professional', billingCycle: 'monthly' },
      { productId: proHotelAI.id, planKey: 'professional', name: 'Professional Annual', billingCycle: 'annual' },
      { productId: proHotelAI.id, planKey: 'enterprise', name: 'Enterprise', billingCycle: 'monthly' },
      { productId: proHotelAI.id, planKey: 'enterprise', name: 'Enterprise Annual', billingCycle: 'annual' },
      { productId: proCafeAI.id, planKey: 'basic', name: 'Basic', billingCycle: 'monthly' },
      { productId: proCafeAI.id, planKey: 'basic', name: 'Basic Annual', billingCycle: 'annual' },
      { productId: proCafeAI.id, planKey: 'pro', name: 'Pro', billingCycle: 'monthly' },
      { productId: proCafeAI.id, planKey: 'pro', name: 'Pro Annual', billingCycle: 'annual' },
    ],
    skipDuplicates: true,
  });
  console.log(`  ✓ Created product plans`);

  // Create sample partner
  console.log('Creating sample partner...');
  const partnerPasswordHash = await bcrypt.hash('partner123', 12);
  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@example.com' },
    update: {},
    create: {
      email: 'partner@example.com',
      passwordHash: partnerPasswordHash,
      name: 'Sample Partner',
      role: 'partner',
      partner: {
        create: {
          partnerCode: 'SAMPLE01',
          type: 'referral',
          status: 'approved',
          tierId: tiers[0].id, // Starter tier
          country: 'US',
          approvalModeUsed: 'manual',
          isGlobal: true,
        },
      },
    },
    include: { partner: true },
  });
  console.log(`  ✓ Partner user: partner@example.com / partner123`);
  console.log(`  ✓ Partner code: SAMPLE01`);

  // Set commission rates for sample partner
  if (partnerUser.partner) {
    console.log('Setting commission rates...');
    await prisma.partnerCommissionOverride.createMany({
      data: [
        {
          partnerId: partnerUser.partner.id,
          productId: proHotelAI.id,
          percent: 15,
          setByAdminId: adminUser.id,
        },
        {
          partnerId: partnerUser.partner.id,
          productId: proCafeAI.id,
          percent: 12,
          setByAdminId: adminUser.id,
        },
      ],
      skipDuplicates: true,
    });
    console.log(`  ✓ Set commission rates: ProHotelAI 15%, ProCafeAI 12%`);
  }

  // Create sample assets
  console.log('Creating sample assets...');
  await prisma.assetLibrary.createMany({
    data: [
      {
        productId: proHotelAI.id,
        type: 'banner',
        title: 'ProHotelAI Banner 728x90',
        fileUrl: 'https://example.com/assets/prohotelai-banner-728x90.png',
        size: '728x90',
        language: 'en',
        active: true,
      },
      {
        productId: proHotelAI.id,
        type: 'banner',
        title: 'ProHotelAI Banner 300x250',
        fileUrl: 'https://example.com/assets/prohotelai-banner-300x250.png',
        size: '300x250',
        language: 'en',
        active: true,
      },
      {
        productId: proCafeAI.id,
        type: 'banner',
        title: 'ProCafeAI Banner 728x90',
        fileUrl: 'https://example.com/assets/procafeai-banner-728x90.png',
        size: '728x90',
        language: 'en',
        active: true,
      },
      {
        productId: proCafeAI.id,
        type: 'pdf',
        title: 'ProCafeAI Product Brochure',
        fileUrl: 'https://example.com/assets/procafeai-brochure.pdf',
        size: 'A4',
        language: 'en',
        active: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`  ✓ Created sample assets`);

  console.log('\\n✅ Seed completed!');
  console.log('\\n📋 Quick Start:');
  console.log('  1. Admin login: admin@proinvest.global / admin123');
  console.log('  2. Partner login: partner@example.com / partner123');
  console.log('  3. Partner code: SAMPLE01');
  console.log('\\n📦 Products with webhook secrets:');
  console.log(`  • ProHotelAI: whsec_prohotelai_test_secret_key_12345`);
  console.log(`  • ProCafeAI: whsec_procafeai_test_secret_key_12345`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
