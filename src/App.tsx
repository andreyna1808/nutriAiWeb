import { useEffect, useState } from 'react'
import { useI18n } from './contexts/I18nContext'
import { Header } from './components/Header'
import { usePreferences } from './contexts/PreferenceContext';
import { useColorMode } from './components/ui/color-mode';
import { Box } from '@chakra-ui/react';
import type { AppTab } from './types';
import { Onboarding } from './components/Onboarding';
import { MetricCard } from './components/Dashboard/MetricCard';
import { FaX } from 'react-icons/fa6';
import { MacroProgress } from './components/Dashboard/MacroProgress';
import { EmptyMeals } from './components/Dashboard/EmptyMeals';
import { MealItem } from './components/Dashboard/MealItem';
import { MealSection } from './components/Dashboard/MealSection';
import { DashboardPage } from './components/Dashboard';

function App() {
  const { t } = useI18n();
  const { preferences } = usePreferences();
  const { setColorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard')

  useEffect(() => {
    setColorMode(preferences.theme)
  }, [preferences.theme, setColorMode])

  if (!preferences?.profile) {
    return <Onboarding />
  }

  const onTabChanel = (tab: AppTab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Header activeTab={activeTab} onTabChange={onTabChanel} />

      <Box mt={4}>
        {activeTab === 'dashboard' && (
          <DashboardPage onNavigate={onTabChanel} />
        )}
      </Box>


    </>
  )
}

export default App
