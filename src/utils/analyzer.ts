interface AnalysisResult {
  atsScore: number;
  suggestedKeywords: string[];
  recommendations: string[];
  grammarSuggestions: string[];
}

interface IndustryKeywords {
  [key: string]: string[];
}

const commonKeywords = [
  'leadership',
  'project management',
  'team collaboration',
  'problem-solving',
  'communication',
  'data analysis',
  'strategic planning',
  'innovation',
  'customer service',
  'process improvement',
  'agile',
  'cross-functional',
  'optimization',
  'stakeholder management',
  'results-driven'
];

const industryKeywords: IndustryKeywords = {
  tech: [
    'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'cloud computing', 'API development',
    'machine learning', 'DevOps', 'CI/CD', 'microservices', 'system design'
  ],
  consulting: [
    'strategy consulting', 'business analysis', 'market research', 'change management',
    'client relations', 'business development', 'project delivery', 'stakeholder engagement'
  ],
  finance: [
    'financial analysis', 'risk management', 'portfolio management', 'forecasting',
    'investment banking', 'private equity', 'financial modeling', 'valuation'
  ],
  marketing: [
    'digital marketing', 'SEO', 'content strategy', 'social media marketing',
    'brand management', 'market analysis', 'campaign optimization', 'analytics'
  ],
  healthcare: [
    'patient care', 'clinical operations', 'HIPAA compliance', 'healthcare informatics',
    'medical records', 'quality assurance', 'regulatory compliance'
  ],
  product: [
    'product management', 'user research', 'product strategy', 'roadmap planning',
    'A/B testing', 'product analytics', 'feature prioritization', 'user experience'
  ]
};

const commonGrammarMistakes = [
  { wrong: 'i ', correct: 'I ' },
  { wrong: 'im ', correct: "I'm " },
  { wrong: 'ive ', correct: "I've " },
  { wrong: 'dont ', correct: "don't " },
  { wrong: 'cant ', correct: "can't " },
  { wrong: 'wont ', correct: "won't " }
];

export function analyzeResume(text: string, industry?: string): AnalysisResult {
  const textLower = text.toLowerCase();
  
  // Calculate keyword matches
  const foundKeywords = commonKeywords.filter(keyword => 
    textLower.includes(keyword.toLowerCase())
  );
  
  // Add industry-specific keywords if industry is specified
  let industrySpecificKeywords: string[] = [];
  if (industry && industryKeywords[industry]) {
    industrySpecificKeywords = industryKeywords[industry].filter(keyword =>
      textLower.includes(keyword.toLowerCase())
    );
  }
  
  // Calculate ATS score
  const keywordScore = (foundKeywords.length / commonKeywords.length) * 100;
  const lengthScore = Math.min(100, (text.length / 2000) * 100);
  const industryScore = industry ? 
    (industrySpecificKeywords.length / industryKeywords[industry].length) * 100 : 0;
  
  const atsScore = Math.round((keywordScore + lengthScore + (industry ? industryScore : 0)) / 
    (industry ? 3 : 2));
  
  // Generate missing keywords suggestions
  const missingKeywords = [
    ...commonKeywords.filter(keyword => !textLower.includes(keyword.toLowerCase())),
    ...(industry && industryKeywords[industry] ? 
      industryKeywords[industry].filter(keyword => !textLower.includes(keyword.toLowerCase())) : 
      [])
  ];
  
  // Check for grammar mistakes
  const grammarSuggestions = commonGrammarMistakes
    .filter(({ wrong }) => textLower.includes(wrong))
    .map(({ wrong, correct }) => `Replace "${wrong.trim()}" with "${correct.trim()}"`);
  
  // Generate recommendations
  const recommendations = [
    'Use more action verbs to describe your achievements',
    'Include specific metrics and quantifiable results',
    'Ensure your contact information is clearly visible',
    'Customize your resume for each job application',
    'Keep formatting simple and ATS-friendly',
    'Proofread your resume for spelling and grammar errors',
    'Use industry-specific keywords relevant to your target role',
    'Quantify your achievements with numbers and percentages',
    'Highlight your most relevant skills and experiences',
  ];
  
  if (missingKeywords.length > 0) {
    recommendations.push(`Consider adding these keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
  }
  
  if (text.length < 2000) {
    recommendations.push('Add more detailed descriptions of your experiences');
  }
  
  return {
    atsScore,
    suggestedKeywords: [...foundKeywords, ...missingKeywords.slice(0, 5)],
    recommendations,
    grammarSuggestions
  };
}