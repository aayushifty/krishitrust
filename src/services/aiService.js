// src/services/aiService.js
import axios from 'axios';

// Get API keys from environment variables
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("🌾 KrishiTrust AI Service Initialized");
console.log("🔑 OpenRouter Key exists:", !!OPENROUTER_API_KEY);
console.log("🔑 Gemini Key exists:", !!GEMINI_API_KEY);
console.log("📡 API Status:", OPENROUTER_API_KEY || GEMINI_API_KEY ? "✅ Ready" : "❌ No API keys found");

// Free working models on OpenRouter
const MODELS = {
  FREE: [
    "google/gemini-2.0-flash-lite-001",
    "meta-llama/llama-3.2-3b-instruct", 
    "microsoft/phi-3-mini-128k-instruct"
  ],
  BEST: "google/gemini-2.0-flash-lite-001"
};

// Rate limiting
let lastRequestTime = 0;
const MIN_DELAY = 3000;

// Agricultural Business & Finance Knowledge Base
const AGRICULTURAL_KNOWLEDGE = {
  // Business & Finance Knowledge
  business: {
    'finance_readiness': 'Finance readiness measures your business\'s ability to access financial services. Key factors include business reliability, operational consistency, and financial documentation.',
    'business_reliability': 'Business reliability is built through consistent operations, on-time deliveries, and maintaining quality standards over time.',
    'handling_score': 'Handling score measures transport conditions including vibration, shock events, and movement patterns that affect produce quality.',
    'documentation': 'Good business documentation includes delivery records, quality certificates, and financial transaction history.',
  },
  
  // Agricultural Knowledge
  crops: {
    tomatoes: { season: 'Winter/Spring', idealTemp: '20-25°C', water: '400-600mm', soil: 'Sandy Loam', handling: 'Fragile, sensitive to shock' },
    cauliflower: { season: 'Winter', idealTemp: '15-20°C', water: '400-500mm', soil: 'Clay Loam', handling: 'Moderate, requires cushioning' },
    mangoes: { season: 'Summer', idealTemp: '25-35°C', water: '500-800mm', soil: 'Loamy', handling: 'Fragile, bruise easily' },
    potatoes: { season: 'Winter/Spring', idealTemp: '15-20°C', water: '400-600mm', soil: 'Sandy', handling: 'Durable, good for transport' },
    apples: { season: 'Autumn', idealTemp: '10-20°C', water: '500-800mm', soil: 'Silty Loam', handling: 'Fragile, requires padding' },
    rice: { season: 'Monsoon', idealTemp: '20-35°C', water: '1000-2000mm', soil: 'Clay', handling: 'Durable, stored in bags' },
    wheat: { season: 'Winter', idealTemp: '15-25°C', water: '450-650mm', soil: 'Loamy', handling: 'Durable, bulk transport' },
    vegetables: { season: 'Various', idealTemp: '15-25°C', water: '400-600mm', soil: 'Sandy Loam', handling: 'Varies by type' },
  },
  
  // Handling & Transport Knowledge
  handling: {
    vibration: 'Excessive vibration can cause bruising and quality degradation in produce. Use cushioning materials and maintain stable speeds.',
    shock: 'Shock events from sudden braking or rough roads can damage delicate produce. Avoid sudden movements and maintain gentle handling.',
    temperature: 'Temperature fluctuations can reduce produce shelf life. Maintain optimal temperature throughout transport.',
    humidity: 'High humidity can cause mold growth; low humidity causes wilting. Maintain optimal humidity levels during transport.',
  },
  
  // Education Content
  education: {
    'improve_handling': [
      'Use appropriate packaging materials (cushioning, ventilation)',
      'Maintain consistent vehicle speed and avoid sudden movements',
      'Monitor temperature and humidity throughout transport',
      'Train handlers on gentle produce handling practices'
    ],
    'improve_reliability': [
      'Establish consistent delivery schedules',
      'Maintain quality standards and certifications',
      'Build relationships with buyers and cooperatives',
      'Document all business activities and transactions'
    ],
    'improve_finance': [
      'Keep detailed business and financial records',
      'Build a history of successful deliveries',
      'Develop business relationships with financial institutions',
      'Complete financial literacy education programs'
    ]
  }
};

export const askAI = async (question) => {
  // Rate limiting
  const now = Date.now();
  const timeSince = now - lastRequestTime;
  if (timeSince < MIN_DELAY) {
    await new Promise(resolve => setTimeout(resolve, MIN_DELAY - timeSince));
  }
  lastRequestTime = Date.now();

  console.log("🌾 KrishiTrust AI Query:", question);
  
  // Check if question matches knowledge base
  const localResponse = checkLocalKnowledge(question);
  if (localResponse) {
    console.log("📚 Local Knowledge Response:", localResponse);
    return localResponse;
  }
  
  // Try OpenRouter first
  if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== 'your_openrouter_api_key_here') {
    try {
      console.log("📡 Sending to OpenRouter...");
      
      const response = await axios({
        method: 'POST',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'KrishiTrust AI'
        },
        data: {
          model: MODELS.BEST,
          messages: [
            {
              role: "system",
              content: `You are KrishiTrust AI, an agricultural business intelligence expert. 
              Provide practical advice about:
              - Shipment handling and risk management
              - Business reliability and operational consistency
              - Finance readiness and business documentation
              - Agricultural practices and produce quality
              Focus on helping farmers improve their business profile and finance readiness.
              Use explainable language. Say "may indicate" or "may affect" rather than making definitive claims.
              Max 4 sentences. Be specific and practical.
              If you don't know, say "I don't have that information in my agricultural business database."`
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 250,
          temperature: 0.7
        },
        timeout: 30000
      });
      
      const text = response.data?.choices?.[0]?.message?.content;
      if (text) {
        console.log("✅ OpenRouter Response:", text.substring(0, 100) + "...");
        return text;
      } else {
        console.log("❌ No text in OpenRouter response");
        return await tryOtherModels(question);
      }
    } catch (error) {
      console.error("❌ OpenRouter Error:", error.response?.data?.error?.message || error.message);
      
      const fallbackResult = await tryOtherModels(question);
      if (fallbackResult) return fallbackResult;
      
      if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
        console.log("🔄 Falling back to Gemini...");
        return await askGemini(question);
      }
      
      return getFallbackResponse(question);
    }
  }
  
  // Try Gemini only
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    console.log("📡 Using Gemini only...");
    return await askGemini(question);
  }
  
  return "⚠️ No valid API keys found. Please check your .env file.";
};

// Local knowledge base check - Business & Finance Focus
const checkLocalKnowledge = (question) => {
  const q = question.toLowerCase();
  
  // Business & Finance Queries
  if (q.includes('finance readiness') || q.includes('finance readiness score') || q.includes('readiness')) {
    return "💰 Finance readiness assesses your business's ability to access financial services. It considers business reliability, operational consistency, and financial documentation. Improve it by maintaining consistent delivery records and building a business history.";
  }
  
  if (q.includes('business reliability') || q.includes('reliability')) {
    return "📈 Business reliability measures your operational consistency. It's built through on-time deliveries, maintaining quality standards, and building a track record of successful shipments. Strong reliability improves your finance readiness.";
  }
  
  if (q.includes('handling score') || q.includes('handling risk')) {
    return "📦 Handling score measures transport conditions including vibration, shock events, and movement patterns. Good handling practices protect produce quality and improve your business profile. Monitor your handling score to identify improvement areas.";
  }
  
  if (q.includes('business documentation') || q.includes('documentation')) {
    return "📋 Good business documentation is essential for finance readiness. This includes delivery records, quality certificates, transaction histories, and business registration. Start with consistent record-keeping of all shipments.";
  }
  
  if (q.includes('improve business') || q.includes('improve finance') || q.includes('improve readiness')) {
    return "🌾 To improve your business profile and finance readiness: 1) Maintain consistent delivery records, 2) Track and improve handling scores, 3) Document all business activities, 4) Build relationships with buyers and financial partners.";
  }
  
  // Shipment & Handling Queries
  if (q.includes('shipment risk') || q.includes('risk')) {
    return "⚠️ Shipment risk is determined by handling conditions during transport. Monitor vibration, shock events, and route conditions. Reduce risk by using proper packaging, maintaining steady speeds, and avoiding rough routes.";
  }
  
  if (q.includes('vibration') || q.includes('shock')) {
    return "📊 Vibration and shock events can affect produce quality. Use cushioning materials, maintain consistent speeds, and avoid sudden movements. High shock levels may indicate a need for handling practice reviews.";
  }
  
  // Crop-specific handling queries
  for (const [crop, info] of Object.entries(AGRICULTURAL_KNOWLEDGE.crops)) {
    if (q.includes(crop)) {
      if (q.includes('handling')) {
        return `📦 ${crop.charAt(0).toUpperCase() + crop.slice(1)} handling: ${info.handling}. Use appropriate packaging and maintain gentle transport conditions.`;
      }
      if (q.includes('season')) return `🌾 ${crop.charAt(0).toUpperCase() + crop.slice(1)} growing season: ${info.season}.`;
      if (q.includes('temperature') || q.includes('temp')) return `🌡️ ${crop.charAt(0).toUpperCase() + crop.slice(1)} ideal temperature: ${info.idealTemp}.`;
      if (q.includes('soil')) return `🌱 ${crop.charAt(0).toUpperCase() + crop.slice(1)} prefers ${info.soil} soil.`;
    }
  }
  
  // Education Queries
  if (q.includes('learn') || q.includes('improve')) {
    if (q.includes('handling')) {
      return "📚 To improve handling: Use proper packaging, maintain consistent vehicle speed, monitor temperature/humidity, and train handlers on gentle practices. Good handling protects produce quality and builds business reliability.";
    }
    if (q.includes('reliability')) {
      return "📚 To improve business reliability: Establish consistent delivery schedules, maintain quality standards, build buyer relationships, and document all business activities. Consistency builds trust.";
    }
    if (q.includes('finance') || q.includes('readiness')) {
      return "📚 To improve finance readiness: Keep detailed business records, build a history of successful deliveries, develop relationships with financial institutions, and complete financial literacy programs.";
    }
  }
  
  // General queries
  if (q.includes('agriculture') || q.includes('farming')) {
    return "🌾 KrishiTrust provides intelligence on agricultural business performance, handling risk, and finance readiness. What specific aspect can I help you with?";
  }
  
  if (q.includes('harvest') || q.includes('harvesting')) {
    return "🌾 Harvest timing affects produce quality during transport. Monitor maturity indicators and plan transport carefully to minimize handling risk and maintain quality.";
  }
  
  return null;
};

// Try different models if one fails
const tryOtherModels = async (question) => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') return null;
  
  for (const model of MODELS.FREE) {
    if (model === MODELS.BEST) continue;
    try {
      console.log(`🔄 Trying model: ${model}`);
      const response = await axios({
        method: 'POST',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'KrishiTrust AI'
        },
        data: {
          model: model,
          messages: [
            {
              role: "system",
              content: "You are KrishiTrust AI, an agricultural business intelligence expert. Give practical advice on handling, business reliability, and finance readiness. Use explainable language."
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 250,
          temperature: 0.7
        },
        timeout: 30000
      });
      
      const text = response.data?.choices?.[0]?.message?.content;
      if (text) {
        console.log(`✅ Model ${model} responded`);
        return text;
      }
    } catch (error) {
      console.log(`❌ Model ${model} failed`);
    }
  }
  return null;
};

// Gemini fallback
const askGemini = async (question) => {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') return null;
    
    console.log("📡 Sending to Gemini...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `You are KrishiTrust AI, an agricultural business intelligence expert. Provide practical advice about handling risk, business reliability, or finance readiness. Focus on helping farmers improve their business profile. Use explainable language - say "may indicate" rather than making definitive claims. Max 3 sentences. Question: ${question}` 
            }] 
          }]
        })
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      if (data.error.message?.includes('429')) {
        return "⏳ Quota limit reached. Please wait 1-2 minutes and try again.";
      }
      return `⚠️ Error: ${data.error.message}`;
    }
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      console.log("✅ Gemini Response received");
      return text;
    }
    return getFallbackResponse(question);
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    return getFallbackResponse(question);
  }
};

// Fallback responses - Business Focus
const getFallbackResponse = (question) => {
  const q = question.toLowerCase();
  
  if (q.includes('handling') || q.includes('shipment')) {
    return "📦 Good handling practices protect produce quality and build business reliability. Monitor vibration, shock, and temperature during transport. Use proper packaging and maintain consistent conditions.";
  }
  
  if (q.includes('finance') || q.includes('readiness') || q.includes('business')) {
    return "💰 Finance readiness is built through consistent business operations and good documentation. Track your deliveries, maintain quality standards, and build relationships with financial partners.";
  }
  
  if (q.includes('learn') || q.includes('education')) {
    return "📚 KrishiTrust provides education on handling practices, business reliability, and finance readiness. Focus on improving one area at a time and track your progress.";
  }
  
  if (q.includes('crop') || q.includes('plant') || q.includes('produce')) {
    return "🌾 For produce handling advice, consider the specific crop type. Different crops have different handling requirements. Monitor conditions and adjust practices accordingly.";
  }
  
  return "🌾 KrishiTrust AI is ready to assist with your agricultural business questions. Ask about handling risk, business reliability, finance readiness, or specific produce handling.";
};

// Export agricultural business knowledge for use in other components
export const getAgriculturalKnowledge = () => {
  return AGRICULTURAL_KNOWLEDGE;
};

// Export function to get handling recommendations
export const getHandlingRecommendations = (crop) => {
  if (crop && AGRICULTURAL_KNOWLEDGE.crops[crop.toLowerCase()]) {
    const info = AGRICULTURAL_KNOWLEDGE.crops[crop.toLowerCase()];
    return {
      crop: crop,
      handling: info.handling,
      recommendations: AGRICULTURAL_KNOWLEDGE.education.improve_handling
    };
  }
  return {
    recommendations: AGRICULTURAL_KNOWLEDGE.education.improve_handling
  };
};

// Export function to get business improvement tips
export const getBusinessImprovementTips = () => {
  return {
    reliability: AGRICULTURAL_KNOWLEDGE.education.improve_reliability,
    finance: AGRICULTURAL_KNOWLEDGE.education.improve_finance
  };
};

// Export function to get finance readiness tips
export const getFinanceReadinessTips = () => {
  return AGRICULTURAL_KNOWLEDGE.education.improve_finance;
};

// Check API status
export const checkAPIStatus = () => {
  const status = {
    openRouter: !!OPENROUTER_API_KEY && OPENROUTER_API_KEY !== 'your_openrouter_api_key_here',
    gemini: !!GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here',
    message: ''
  };
  
  if (!status.openRouter && !status.gemini) {
    status.message = '⚠️ No valid API keys found. Please check your .env file.';
  } else if (status.openRouter) {
    status.message = '✅ AI services ready (OpenRouter + Gemini fallback)';
  } else {
    status.message = '✅ AI services ready (Gemini only)';
  }
  
  return status;
};

export default { 
  ask: askAI,
  getAgriculturalKnowledge,
  getHandlingRecommendations,
  getBusinessImprovementTips,
  getFinanceReadinessTips,
  checkAPIStatus
};