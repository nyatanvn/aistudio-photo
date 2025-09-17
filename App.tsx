import React, { useState, useEffect } from 'react';
import type { Tool, ImageItem } from './types';
import HubView from './views/HubView';
import ToolRunner from './ToolRunner';
import DonationView from './views/DonationView';

const CLOTHING_LIBRARY_KEY = 'clothingLibrary';
const ADMIN_KEY = 'aiStudioAdmin';


const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full text-center py-4 mt-auto flex-shrink-0">
      <p className="text-xs text-neutral-600">
        &copy; {currentYear} Trac Quoc Studio. All Rights Reserved.
      </p>
    </footer>
  );
};


export default function App(): React.ReactElement {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showingDonationPage, setShowingDonationPage] = useState<boolean>(false);
  const [clothingLibrary, setClothingLibrary] = useState<ImageItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    // Load Clothing Library from localStorage
    const savedLibrary = localStorage.getItem(CLOTHING_LIBRARY_KEY);
    if (savedLibrary) {
        try {
            setClothingLibrary(JSON.parse(savedLibrary));
        } catch (e) {
            console.error("Could not parse clothing library from localStorage", e);
            localStorage.removeItem(CLOTHING_LIBRARY_KEY);
        }
    }
    
    // Check admin status from localStorage
    try {
        const savedAdminStatus = localStorage.getItem(ADMIN_KEY);
        if (savedAdminStatus === 'true') {
            setIsAdmin(true);
        }
    } catch (e) {
        console.error("Could not check admin status from localStorage", e);
        localStorage.removeItem(ADMIN_KEY);
    }

  }, []);
  
  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
    setShowingDonationPage(false);
  };

  const handleBackToHub = () => {
    setSelectedTool(null);
    setShowingDonationPage(false);
  };
  
  const handleNavigateToDonation = () => {
      setSelectedTool(null);
      setShowingDonationPage(true);
  }

  const renderContent = () => {
      if (showingDonationPage) {
          return <DonationView onBackToHub={handleBackToHub} isAdmin={isAdmin} />;
      }
      if (selectedTool) {
          return <ToolRunner 
              tool={selectedTool} 
              onBackToHub={handleBackToHub} 
              clothingLibrary={clothingLibrary}
              setClothingLibrary={setClothingLibrary}
          />;
      }
      return <HubView 
        onSelectTool={handleSelectTool} 
        onNavigateToDonation={handleNavigateToDonation}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />;
  }


  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-slate-200 font-sans antialiased">
      <div className="flex-grow">
        {renderContent()}
      </div>
      <AppFooter />
    </div>
  );
}