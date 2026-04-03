// =============================================================================
// src/data/scenarios/index.js — Scenario Loader
// =============================================================================
// Migrated scenarios load from JSON. Remaining scenarios load from scenarios.js.
// Migration status:
//   S1  ✅ JSON
//   S2  ✅ JSON
//   S3  ✅ JSON
//   S4  ✅ JSON
//   S5  ✅ JSON
//   S6  ✅ JSON
//   S7  ✅ JSON
//   S8  ✅ JSON
//   S9  ✅ JSON
//   S10 ✅ JSON
//   S11 ✅ JSON
//   S12 ✅ JSON
//   S13 ✅ JSON
//   S14 ✅ JSON
//   S15 ✅ JSON
//   S16 ✅ JSON
//   S17 ✅ JSON
//   S18 ✅ JSON
//   S19 ✅ JSON
//   S20 ✅ JSON
//   S21 ✅ JSON
//   S22 ✅ JSON
//   S23 ✅ JSON
//   S24 ✅ JSON
//   S25 ✅ JSON
//   All 25 scenarios migrated ✅
// =============================================================================

// All 18 scenarios are now migrated to JSON — legacy import no longer needed

// Fetch migrated scenarios from JSON
const [s1Response, s2Response, s3Response, s4Response, s5Response, s6Response, s7Response, s8Response, s9Response, s10Response, s11Response, s12Response, s13Response, s14Response, s15Response, s16Response, s17Response, s18Response, s19Response, s20Response, s21Response, s22Response, s23Response, s24Response, s25Response] = await Promise.all([
  fetch('./src/data/scenarios/s1.json'),
  fetch('./src/data/scenarios/s2.json'),
  fetch('./src/data/scenarios/s3.json'),
  fetch('./src/data/scenarios/s4.json'),
  fetch('./src/data/scenarios/s5.json'),
  fetch('./src/data/scenarios/s6.json'),
  fetch('./src/data/scenarios/s7.json'),
  fetch('./src/data/scenarios/s8.json'),
  fetch('./src/data/scenarios/s9.json'),
  fetch('./src/data/scenarios/s10.json'),
  fetch('./src/data/scenarios/s11.json'),
  fetch('./src/data/scenarios/s12.json'),
  fetch('./src/data/scenarios/s13.json'),
  fetch('./src/data/scenarios/s14.json'),
  fetch('./src/data/scenarios/s15.json'),
  fetch('./src/data/scenarios/s16.json'),
  fetch('./src/data/scenarios/s17.json'),
  fetch('./src/data/scenarios/s18.json'),
  fetch('./src/data/scenarios/s19.json'),
  fetch('./src/data/scenarios/s20.json'),
  fetch('./src/data/scenarios/s21.json'),
  fetch('./src/data/scenarios/s22.json'),
  fetch('./src/data/scenarios/s23.json'),
  fetch('./src/data/scenarios/s24.json'),
  fetch('./src/data/scenarios/s25.json')
]);

const s1 = await s1Response.json();
const s2 = await s2Response.json();
const s3 = await s3Response.json();
const s4 = await s4Response.json();
const s5 = await s5Response.json();
const s6 = await s6Response.json();
const s7 = await s7Response.json();
const s8 = await s8Response.json();
const s9 = await s9Response.json();
const s10 = await s10Response.json();
const s11 = await s11Response.json();
const s12 = await s12Response.json();
const s13 = await s13Response.json();
const s14 = await s14Response.json();
const s15 = await s15Response.json();
const s16 = await s16Response.json();
const s17 = await s17Response.json();
const s18 = await s18Response.json();
const s19 = await s19Response.json();
const s20 = await s20Response.json();
const s21 = await s21Response.json();
const s22 = await s22Response.json();
const s23 = await s23Response.json();
const s24 = await s24Response.json();
const s25 = await s25Response.json();

s1._source = 'json';
s2._source = 'json';
s3._source = 'json';
s4._source = 'json';
s5._source = 'json';
s6._source = 'json';
s7._source = 'json';
s8._source = 'json';
s9._source = 'json';
s10._source = 'json';
s11._source = 'json';
s12._source = 'json';
s13._source = 'json';
s14._source = 'json';
s15._source = 'json';
s16._source = 'json';
s17._source = 'json';
s18._source = 'json';
s19._source = 'json';
s20._source = 'json';
s21._source = 'json';
s22._source = 'json';
s23._source = 'json';
s24._source = 'json';
s25._source = 'json';

console.log('[scenarios/index.js] Loaded from JSON: S1–S25');

// All 25 scenarios migrated
export const scenarios = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25];
