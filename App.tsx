/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiscordSection } from './components/DiscordSection';
import { SocialsSection } from './components/SocialsSection';
import { FiveMSection } from './components/FiveMSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { EditProfileModal } from './components/EditProfileModal';
import { EditSocialsModal } from './components/EditSocialsModal';
import { EditDiscordModal } from './components/EditDiscordModal';
import { EditAboutModal } from './components/EditAboutModal';
import { AddFiveMCharacterModal } from './components/AddFiveMCharacterModal';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { QrCodeModal } from './components/QrCodeModal';
import { Toast } from './components/Toast';
import {
  ThemeMode,
  ActiveTab,
  UserProfile,
  SocialAccount,
  DiscordServerConfig,
  SetupSpecItem,
  FavoriteGameItem,
  FaqItem,
  FiveMCharacter,
} from './types';
import {
  DEFAULT_PROFILE,
  DEFAULT_SOCIALS,
  DEFAULT_DISCORD_CONFIG,
  DEFAULT_GAMING_SETUP,
  DEFAULT_FAVORITE_GAMES,
  DEFAULT_FAQS,
  DEFAULT_FIVEM_CHARACTERS,
} from './data/defaultData';

export default function App() {
  // Theme state: dark (black + blue) by default, light (white + blue)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('kylr_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Independent Tab state ('all', 'socials', 'discord', 'fivem', 'about')
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');

  // Security PIN and device unlock authorization (updated to 1200)
  const [masterPin, setMasterPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('kylr_pin');
      if (!saved || saved === '1234') {
        localStorage.setItem('kylr_pin', '1200');
        return '1200';
      }
      return saved;
    } catch {
      return '1200';
    }
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kylr_device_unlocked');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Profile data
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('kylr_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Social accounts state
  const [socials, setSocials] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem('kylr_socials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((acc: SocialAccount) =>
            acc.id === 'discord' && acc.url?.includes('discord.gg/kylr')
              ? { ...acc, url: 'https://discord.gg/RBfG8mYUHQ' }
              : acc
          );
        }
      }
      return DEFAULT_SOCIALS;
    } catch {
      return DEFAULT_SOCIALS;
    }
  });

  // Discord config state (synced with https://discord.gg/RBfG8mYUHQ)
  const [discordConfig, setDiscordConfig] = useState<DiscordServerConfig>(() => {
    try {
      const saved = localStorage.getItem('kylr_discord');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_DISCORD_CONFIG,
            ...parsed,
            inviteCode:
              !parsed.inviteCode || parsed.inviteCode === 'kylr'
                ? 'RBfG8mYUHQ'
                : parsed.inviteCode,
            inviteUrl:
              !parsed.inviteUrl || parsed.inviteUrl.includes('discord.gg/kylr')
                ? 'https://discord.gg/RBfG8mYUHQ'
                : parsed.inviteUrl,
            channels:
              Array.isArray(parsed.channels) && parsed.channels.length > 0
                ? parsed.channels
                : DEFAULT_DISCORD_CONFIG.channels,
            roles:
              Array.isArray(parsed.roles) && parsed.roles.length > 0
                ? parsed.roles
                : DEFAULT_DISCORD_CONFIG.roles,
          };
        }
      }
      return DEFAULT_DISCORD_CONFIG;
    } catch {
      return DEFAULT_DISCORD_CONFIG;
    }
  });

  // FiveM Characters state
  const [fivemCharacters, setFivemCharacters] = useState<FiveMCharacter[]>(() => {
    try {
      const saved = localStorage.getItem('kylr_fivem');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_FIVEM_CHARACTERS;
    } catch {
      return DEFAULT_FIVEM_CHARACTERS;
    }
  });

  // Setup Specs, Games, FAQs state
  const [setupSpecs, setSetupSpecs] = useState<SetupSpecItem[]>(() => {
    try {
      const saved = localStorage.getItem('kylr_specs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_GAMING_SETUP;
    } catch {
      return DEFAULT_GAMING_SETUP;
    }
  });

  const [favoriteGames, setFavoriteGames] = useState<FavoriteGameItem[]>(() => {
    try {
      const saved = localStorage.getItem('kylr_games');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_FAVORITE_GAMES;
    } catch {
      return DEFAULT_FAVORITE_GAMES;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem('kylr_faqs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  });

  // Modals state
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditSocialsOpen, setIsEditSocialsOpen] = useState(false);
  const [isEditDiscordOpen, setIsEditDiscordOpen] = useState(false);
  const [isEditAboutOpen, setIsEditAboutOpen] = useState(false);
  const [qrModalAccount, setQrModalAccount] = useState<SocialAccount | null>(null);

  // FiveM Character details and edit modal
  const [selectedCharacter, setSelectedCharacter] = useState<FiveMCharacter | null>(null);
  const [isAddCharOpen, setIsAddCharOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<FiveMCharacter | null>(null);

  // Sync theme changes to document body
  useEffect(() => {
    try {
      localStorage.setItem('kylr_theme', theme);
      if (theme === 'light') {
        document.body.className =
          'bg-white text-slate-800 antialiased selection:bg-blue-600 selection:text-white';
      } else {
        document.body.className =
          'bg-[#000000] text-slate-100 antialiased selection:bg-blue-600 selection:text-white';
      }
    } catch {
      // storage unavailable
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(
      nextTheme === 'light'
        ? 'تم تفعيل النمط الفاتح: أبيض وأزرق ☀️'
        : 'تم تفعيل النمط الغامق: أسود وأزرق 🌙'
    );
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3000);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      showToast(`تم نسخ: ${text} بنجاح! 📋`);
      setTimeout(() => setCopiedText(null), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedText(text);
      showToast(`تم نسخ: ${text} بنجاح! 📋`);
      setTimeout(() => setCopiedText(null), 2500);
    }
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth handlers
  const handleUnlockDevice = () => {
    setIsUnlocked(true);
    try {
      localStorage.setItem('kylr_device_unlocked', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLockDevice = () => {
    setIsUnlocked(false);
    try {
      localStorage.setItem('kylr_device_unlocked', 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePin = (newPin: string) => {
    setMasterPin(newPin);
    try {
      localStorage.setItem('kylr_pin', newPin);
    } catch (e) {
      console.error(e);
    }
  };

  // Profile save
  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('kylr_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ تعديلات البروفايل بنجاح! ✨');
  };

  // Socials save
  const handleSaveSocials = (updated: SocialAccount[]) => {
    setSocials(updated);
    try {
      localStorage.setItem('kylr_socials', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ تعديلات الحسابات بنجاح! ✨');
  };

  // Discord save
  const handleSaveDiscord = (updated: DiscordServerConfig) => {
    setDiscordConfig(updated);
    try {
      localStorage.setItem('kylr_discord', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ تعديلات سيرفر ديسكورد بنجاح! ✨');
  };

  // FiveM Character save & delete
  const handleSaveCharacter = (char: FiveMCharacter) => {
    const exists = fivemCharacters.some((c) => c.id === char.id);
    let updated: FiveMCharacter[];
    if (exists) {
      updated = fivemCharacters.map((c) => (c.id === char.id ? char : c));
    } else {
      updated = [char, ...fivemCharacters];
    }
    setFivemCharacters(updated);
    try {
      localStorage.setItem('kylr_fivem', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(exists ? 'تم تحديث بيانات الشخصية! ✨' : 'تم إضافة الشخصية بنجاح! 🎮');
  };

  const handleDeleteCharacter = (id: string) => {
    const updated = fivemCharacters.filter((c) => c.id !== id);
    setFivemCharacters(updated);
    try {
      localStorage.setItem('kylr_fivem', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حذف الشخصية بنجاح! 🗑️');
  };

  // About & Specs & Games & FAQs save
  const handleSaveAbout = (
    specs: SetupSpecItem[],
    games: FavoriteGameItem[],
    updatedFaqs: FaqItem[]
  ) => {
    setSetupSpecs(specs);
    setFavoriteGames(games);
    setFaqs(updatedFaqs);
    try {
      localStorage.setItem('kylr_specs', JSON.stringify(specs));
      localStorage.setItem('kylr_games', JSON.stringify(games));
      localStorage.setItem('kylr_faqs', JSON.stringify(updatedFaqs));
    } catch (e) {
      console.error(e);
    }
    showToast('تم حفظ تعديلات السيت أب والألعاب والأسئلة! ✨');
  };

  const isLight = theme === 'light';

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-600 selection:text-white ${
        isLight ? 'bg-white text-slate-800' : 'bg-[#000000] text-slate-100'
      }`}
    >
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Navigation Bar with Moon/Sun (no text) and Lock/Unlock status */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        discordInviteUrl={discordConfig.inviteUrl}
        onlineCount={discordConfig.onlineMembers}
        isUnlocked={isUnlocked}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content with smooth animated page transitions */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <Hero
                profile={profile}
                discordConfig={discordConfig}
                onSelectTab={handleSelectTab}
                onCopyHandle={handleCopy}
                copiedText={copiedText}
                socials={socials}
                discordInviteUrl={discordConfig.inviteUrl}
                theme={theme}
                isUnlocked={isUnlocked}
                onOpenEditProfile={() => setIsEditProfileOpen(true)}
              />

              <SocialsSection
                socials={socials}
                onCopyHandle={handleCopy}
                copiedText={copiedText}
                onOpenQr={(acc) => setQrModalAccount(acc)}
                onOpenEdit={() => setIsEditSocialsOpen(true)}
                theme={theme}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />

              <DiscordSection
                config={discordConfig}
                onCopyInvite={handleCopy}
                copiedText={copiedText}
                onOpenEdit={() => setIsEditDiscordOpen(true)}
                theme={theme}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />

              <FiveMSection
                characters={fivemCharacters}
                onSelectCharacter={(char) => setSelectedCharacter(char)}
                onOpenAddModal={() => {
                  setEditingCharacter(null);
                  setIsAddCharOpen(true);
                }}
                onEditCharacter={(char) => {
                  setEditingCharacter(char);
                  setIsAddCharOpen(true);
                }}
                onDeleteCharacter={handleDeleteCharacter}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                theme={theme}
              />

              <AboutSection
                theme={theme}
                specs={setupSpecs}
                games={favoriteGames}
                faqs={faqs}
                isUnlocked={isUnlocked}
                onOpenEdit={() => setIsEditAboutOpen(true)}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            </motion.div>
          )}

          {/* Independent List: Socials only */}
          {activeTab === 'socials' && (
            <motion.div
              key="socials"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="py-6"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => handleSelectTab('all')}
                  className={`text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all active:scale-[0.98] ${
                    isLight ? 'bg-blue-50 border-blue-200' : 'bg-[#0a0a0a] border-blue-950 text-blue-400'
                  }`}
                >
                  ← العودة إلى الصفحة الشاملة (الكل)
                </button>
              </div>
              <SocialsSection
                socials={socials}
                onCopyHandle={handleCopy}
                copiedText={copiedText}
                onOpenQr={(acc) => setQrModalAccount(acc)}
                onOpenEdit={() => setIsEditSocialsOpen(true)}
                theme={theme}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            </motion.div>
          )}

          {/* Independent List: Discord Server only */}
          {activeTab === 'discord' && (
            <motion.div
              key="discord"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="py-6"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => handleSelectTab('all')}
                  className={`text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all active:scale-[0.98] ${
                    isLight ? 'bg-blue-50 border-blue-200' : 'bg-[#0a0a0a] border-blue-950 text-blue-400'
                  }`}
                >
                  ← العودة إلى الصفحة الشاملة (الكل)
                </button>
              </div>
              <DiscordSection
                config={discordConfig}
                onCopyInvite={handleCopy}
                copiedText={copiedText}
                onOpenEdit={() => setIsEditDiscordOpen(true)}
                theme={theme}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            </motion.div>
          )}

          {/* Independent List: FiveM only */}
          {activeTab === 'fivem' && (
            <motion.div
              key="fivem"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="py-6"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => handleSelectTab('all')}
                  className={`text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all active:scale-[0.98] ${
                    isLight ? 'bg-blue-50 border-blue-200' : 'bg-[#0a0a0a] border-blue-950 text-blue-400'
                  }`}
                >
                  ← العودة إلى الصفحة الشاملة (الكل)
                </button>
              </div>
              <FiveMSection
                characters={fivemCharacters}
                onSelectCharacter={(char) => setSelectedCharacter(char)}
                onOpenAddModal={() => {
                  setEditingCharacter(null);
                  setIsAddCharOpen(true);
                }}
                onEditCharacter={(char) => {
                  setEditingCharacter(char);
                  setIsAddCharOpen(true);
                }}
                onDeleteCharacter={handleDeleteCharacter}
                isUnlocked={isUnlocked}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                theme={theme}
              />
            </motion.div>
          )}

          {/* Independent List: Setup & Games only */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="py-6"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <button
                  onClick={() => handleSelectTab('all')}
                  className={`text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all active:scale-[0.98] ${
                    isLight ? 'bg-blue-50 border-blue-200' : 'bg-[#0a0a0a] border-blue-950 text-blue-400'
                  }`}
                >
                  ← العودة إلى الصفحة الشاملة (الكل)
                </button>
              </div>
              <AboutSection
                theme={theme}
                specs={setupSpecs}
                games={favoriteGames}
                faqs={faqs}
                isUnlocked={isUnlocked}
                onOpenEdit={() => setIsEditAboutOpen(true)}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        socials={socials}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onSelectTab={handleSelectTab}
        theme={theme}
      />

      {/* Security PIN & Device Authorization Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isUnlocked={isUnlocked}
        onUnlock={handleUnlockDevice}
        onLock={handleLockDevice}
        masterPin={masterPin}
        onUpdatePin={handleUpdatePin}
        onShowToast={showToast}
        theme={theme}
      />

      {/* Edit Profile & Hero Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={() => handleSaveProfile(DEFAULT_PROFILE)}
        theme={theme}
      />

      {/* Edit Socials Modal */}
      <EditSocialsModal
        isOpen={isEditSocialsOpen}
        onClose={() => setIsEditSocialsOpen(false)}
        socials={socials}
        onSave={handleSaveSocials}
        onReset={() => handleSaveSocials(DEFAULT_SOCIALS)}
        theme={theme}
      />

      {/* Edit Discord Server Modal */}
      <EditDiscordModal
        isOpen={isEditDiscordOpen}
        onClose={() => setIsEditDiscordOpen(false)}
        config={discordConfig}
        onSave={handleSaveDiscord}
        onReset={() => handleSaveDiscord(DEFAULT_DISCORD_CONFIG)}
        theme={theme}
      />

      {/* Edit Setup, Games, FAQs Modal */}
      <EditAboutModal
        isOpen={isEditAboutOpen}
        onClose={() => setIsEditAboutOpen(false)}
        specs={setupSpecs}
        games={favoriteGames}
        faqs={faqs}
        onSave={handleSaveAbout}
        onReset={() => handleSaveAbout(DEFAULT_GAMING_SETUP, DEFAULT_FAVORITE_GAMES, DEFAULT_FAQS)}
        theme={theme}
      />

      {/* Add / Edit FiveM Character Modal */}
      <AddFiveMCharacterModal
        isOpen={isAddCharOpen}
        onClose={() => {
          setIsAddCharOpen(false);
          setEditingCharacter(null);
        }}
        onSave={handleSaveCharacter}
        initialCharacter={editingCharacter}
        theme={theme}
      />

      {/* FiveM Character Full Detail & Backstory Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        theme={theme}
      />

      {/* QR Code Quick View Modal */}
      <QrCodeModal
        account={qrModalAccount}
        onClose={() => setQrModalAccount(null)}
        onCopy={handleCopy}
        copiedText={copiedText}
        theme={theme}
      />
    </div>
  );
}
