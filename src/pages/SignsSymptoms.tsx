import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignsSymptoms = () => {
  const navigate = useNavigate();
  const [checkedSymptoms, setCheckedSymptoms] = useState<string[]>([]);

  const handleSymptomCheck = (symptom: string, checked: boolean) => {
    if (checked) {
      setCheckedSymptoms([...checkedSymptoms, symptom]);
    } else {
      setCheckedSymptoms(checkedSymptoms.filter(s => s !== symptom));
    }
  };

  const symptomCategories = {
    "BODY": [
      "Acidosis", "Adrenal fatigue (exhaustion/insufficiency)", "Allergies", "Bad breath", 
      "Bleeding gums", "Blind spots", "Blood pressure (high and low)", "Blood sugar dysregulation", 
      "Body odor", "Breast pain or tenderness", "Breast size change", "Bruising", "Burning scalp", 
      "Burning tongue and mouth", "Carpal tunnel syndrome", "Changes in body shape", 
      "Changes in sense of smell", "Chills", "Clumsiness", "Cold flashes", "Crawling sensations", 
      "Dizziness", "Double vision", "Dry eyes", "Dry mouth and tongue", "Early waking", 
      "Electric shock", "Fatigue/low energy", "Frequent urination", "Frozen shoulder", 
      "Hard bloated stomach", "Headaches or migraines", "Hearing problems", "Heart palpitations", 
      "High cholesterol", "High or low cortisol", "Hot feet", "Hot flashes", "Inflammation", 
      "Insomnia", "Internal tremors/vibrations", "Irregular heartbeat", "Itchy ears", 
      "Joint pain (arthralgia)", "Lightheadedness", "Meibomian gland dysfunction", 
      "Metabolic syndrome", "Muscle atrophy (sarcopenia)", "Muscle cramps", "Night sweats", 
      "Non-alcoholic fatty liver disease", "Ocular migraine", "Osteoporosis", "Pain", 
      "Pelvic and rectal pain", "Phantom smells", "Restless legs syndrome", "Runny nose", 
      "Shortness of breath", "Shoulder pain", "Sleep apnea", "Slower metabolism", 
      "Sore nipples", "Tingling extremities", "Tinnitus", "TMJ", "Vertigo", 
      "Water retention", "Weight fluctuations", "Weight gain"
    ],
    "DIGESTIVE HEALTH": [
      "Abdominal pain", "Acid reflux (indigestion)", "Bloating", "Burping", 
      "Constipation/gas/bloating", "Difficulty swallowing", "Flatulence (gas)", 
      "Food allergies and sensitivities", "Food aversions", "Food cravings", "Heartburn", 
      "High liver enzymes", "Increased hunger", "Irritable bowel syndrome (IBS)", 
      "Lack of appetite", "Loose stools", "Metallic taste in mouth", "Nausea"
    ],
    "MIND": [
      "ADHD", "A feeling of doom", "Anxiety", "Brain fog", "Depression", 
      "Difficulty concentrating", "Feeling emotional and crying", "Health anxiety", 
      "Lack of focus", "Lack of motivation", "Lack of patience", "Lack of self-esteem", 
      "Memory lapse/loss", "Moodiness and mood swings", "Nightmares", "Panic attacks", 
      "Rage", "Sleep problems", "Social anxiety", "Stress"
    ],
    "SEXUAL HEALTH": [
      "Bacterial vaginosis (bv)", "Bladder spasms", "Heavier periods", "Increased libido", 
      "Irregular periods", "Lighter periods", "Loss/low libido", "PMS", 
      "Prolapse (vagina, uterus, rectum)", "Shorter periods", "Urinary incontinence", 
      "Urinary tract infections", "Vaginal dryness"
    ],
    "SKIN & BEAUTY": [
      "Acne", "Brittle nails", "Dry hair", "Dry itchy skin", "Dull skin", 
      "Eczema, psoriasis, and rosacea", "Frizzy hair", "Hair loss", "Hives", 
      "Itching", "Melasma", "Unwanted hair growth", "Wrinkles"
    ]
  };

  return (
    <div style={{ backgroundColor: '#CDD8D1' }} className="h-screen">
      <ScrollArea className="h-full">
        <div className="container mx-auto p-4 max-w-2xl">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Signs & Symptoms</h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Track Your Signs & Symptoms
              </h2>
              <p className="text-muted-foreground mb-6">
                Select all symptoms you're experiencing to track your health patterns.
              </p>
            </div>

            {/* Symptom Categories */}
            {Object.entries(symptomCategories).map(([category, symptoms]) => (
              <div key={category} className="bg-background/80 rounded-lg p-6 backdrop-blur-sm">
                <div 
                  className="text-center py-2 px-4 rounded-md mb-4 font-bold text-white text-sm"
                  style={{ backgroundColor: '#A67B43' }}
                >
                  {category}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {symptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-3">
                      <Checkbox
                        id={symptom}
                        checked={checkedSymptoms.includes(symptom)}
                        onCheckedChange={(checked) => handleSymptomCheck(symptom, !!checked)}
                      />
                      <label 
                        htmlFor={symptom}
                        className="text-sm text-foreground cursor-pointer leading-relaxed"
                      >
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className="pb-6">
              <Button 
                className="w-full"
                style={{ backgroundColor: '#39403B', color: 'white' }}
                disabled={checkedSymptoms.length === 0}
              >
                Save Selected Symptoms ({checkedSymptoms.length})
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SignsSymptoms;