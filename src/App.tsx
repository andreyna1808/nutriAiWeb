import { useEffect, useState } from 'react'
import { useI18n } from './contexts/I18nContext'
import { Header } from './components/Header'
import { usePreferences } from './contexts/PreferenceContext';
import { useColorMode } from './components/ui/color-mode';
import { Box } from '@chakra-ui/react';
import type { AppTab } from './types';
import { Onboarding } from './components/Onboarding';
import { DashboardPage } from './pages/Dashboard';

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

      {activeTab === 'dashboard' && (
        <DashboardPage onNavigate={onTabChanel} />
      )}

      <Box>
        {activeTab === 'meals' && <h1>{t('navAddMeal')}</h1>}
        {activeTab === 'settings' && <h1>{t('navSettings')}</h1>}
      </Box>
    </>
  )
}

export default App
