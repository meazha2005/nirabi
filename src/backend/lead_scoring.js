const SCORING_WEIGHTS = {
  phone: 20,
  email: 10,
  budget: 20,
  timeline: 15,
  property_type: 10,
  project_type: 10,
  design_style: 5,
  requirements: 10,
};

const HOT_THRESHOLD = 70;
const WARM_THRESHOLD = 40;

function scoreLead(fields = {}) {
  let score = 0;
  for (const [field, weight] of Object.entries(SCORING_WEIGHTS)) {
    const val = fields[field];
    if (val && String(val).trim().length > 0) {
      score += weight;
    }
  }

  score = Math.min(score, 100);

  let tier = 'COLD';
  if (score >= HOT_THRESHOLD) {
    tier = 'HOT';
  } else if (score >= WARM_THRESHOLD) {
    tier = 'WARM';
  }

  return { score, tier };
}

module.exports = { scoreLead };
