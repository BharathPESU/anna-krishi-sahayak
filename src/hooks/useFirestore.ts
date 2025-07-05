import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface CropDiagnosis {
  id?: string;
  userId: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  severity: string;
  treatment: string[];
  prevention: string[];
  localTreatments: string[];
  timestamp: Timestamp;
}

export interface MarketPrice {
  id?: string;
  crop: string;
  market: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Timestamp;
  recommendation: string;
}

export interface Conversation {
  id?: string;
  userId: string;
  messages: Array<{
    type: 'user' | 'bot';
    content: string;
    timestamp: Timestamp;
    language: string;
  }>;
  createdAt: Timestamp;
}

export const useCropDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<CropDiagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setDiagnoses([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'cropDiagnoses'),
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const diagnosesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CropDiagnosis[];
      
      setDiagnoses(diagnosesData);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const addDiagnosis = async (diagnosis: Omit<CropDiagnosis, 'id' | 'userId' | 'timestamp'>) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    await addDoc(collection(db, 'cropDiagnoses'), {
      ...diagnosis,
      userId: currentUser.uid,
      timestamp: Timestamp.now()
    });
  };

  return { diagnoses, loading, addDiagnosis };
};

export const useMarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'marketPrices'),
      orderBy('lastUpdated', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pricesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MarketPrice[];
      
      setPrices(pricesData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { prices, loading };
};

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Conversation[];
      
      setConversations(conversationsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const addConversation = async (messages: Conversation['messages']) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    await addDoc(collection(db, 'conversations'), {
      userId: currentUser.uid,
      messages,
      createdAt: Timestamp.now()
    });
  };

  return { conversations, loading, addConversation };
};