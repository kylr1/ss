import {
  UserProfile,
  SocialAccount,
  DiscordServerConfig,
  SetupSpecItem,
  FavoriteGameItem,
  FaqItem,
  FiveMCharacter,
} from '../types';

import avatarImg from '../assets/images/kylr_saud_avatar_1790325338787.jpg';
import bannerImg from '../assets/images/kylr_banner_darkblue_1790325354359.jpg';
import discordArtImg from '../assets/images/discord_community_art_1790325364450.jpg';
import fivemDetectiveImg from '../assets/images/fivem_char_detective_1790327274539.jpg';
import fivemRacerImg from '../assets/images/fivem_char_racer_1790327290462.jpg';

export const DEFAULT_PROFILE: UserProfile = {
  name: "KYLR | SAUD",
  shortName: "سعود",
  tagline: "صانع محتوى وستريمر سعودي",
  bio: "أهلاً بك في موقعي الرسمي! أشارككم شغفي بالألعاب، المقاطع اليومية، البثوث المباشرة، وبناء أفضل مجتمع قيمنق عربي في الديسكورد.",
  location: "المملكة العربية السعودية 🇸🇦",
  primaryHandle: "@kylr_saud",
  avatarUrl: avatarImg,
  bannerUrl: bannerImg,
};

export const DEFAULT_SOCIALS: SocialAccount[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    arabicName: 'تيك توك',
    handle: '@kylr.saud',
    url: 'https://tiktok.com/@kylr.saud',
    description: 'مقاطع يومية، لقطات قيمنق، تحديات حماسية، وبثوث تيك توك لايف.',
    color: '#00f2fe',
    bgGradient: 'from-[#0f172a] via-[#09152b] to-[#041d3b]',
    iconName: 'Video',
    statsLabel: 'المتابعون التقديريون',
    statsValue: '35.4K',
    verified: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    arabicName: 'إنستغرام',
    handle: '@kylr.saud',
    url: 'https://instagram.com/kylr.saud',
    description: 'يوميات، ستوريات كواليس التصوير، صور السيت أب، وإعلانات الفعاليات القادمة.',
    color: '#e1306c',
    bgGradient: 'from-[#17122a] via-[#101b3d] to-[#081f3d]',
    iconName: 'Instagram',
    statsLabel: 'المتابعون التقديريون',
    statsValue: '21.8K',
    verified: true,
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    arabicName: 'سناب شات',
    handle: '@kylr_saud',
    url: 'https://snapchat.com/add/kylr_saud',
    description: 'سنابات سريعة، سوالف عفوية، كواليس البثوث، وتواصل مباشر مع المتابعين.',
    color: '#fffc00',
    bgGradient: 'from-[#1a1b12] via-[#0d1e38] to-[#061830]',
    iconName: 'Ghost',
    statsLabel: 'القصص اليومية',
    statsValue: 'يوميات مستمرة',
    verified: true,
  },
  {
    id: 'discord',
    name: 'Discord',
    arabicName: 'ديسكورد',
    handle: 'KYLR#0001',
    url: 'https://discord.gg/RBfG8mYUHQ',
    description: 'سيرفري الرسمي! رومات صوتية، بطولات وجوائز، وسوالف 24 ساعة.',
    color: '#5865F2',
    bgGradient: 'from-[#101633] via-[#0b1b44] to-[#04142d]',
    iconName: 'MessageSquare',
    statsLabel: 'الأعضاء النشطون',
    statsValue: '4,250+',
    verified: true,
  }
];

export const DEFAULT_DISCORD_CONFIG: DiscordServerConfig = {
  name: "سيرفر KYLR | SAUD الرسمي",
  inviteCode: "RBfG8mYUHQ",
  inviteUrl: "https://discord.gg/RBfG8mYUHQ",
  totalMembers: 4250,
  onlineMembers: 842,
  description: "سيرفر الديسكورد الرسمي لصانع المحتوى KYLR | SAUD. انضم إلينا للمشاركة في البطولات، الفعاليات الأسبوعية، الرومات الصوتية، والشات التفاعلي.",
  announcementText: "🔥 بطولة فالورانت القادمة يوم الجمعة! السحب على جوائز مميزة لجميع المشاركين داخل السيرفر.",
  bannerUrl: discordArtImg,
  channels: [
    { id: '1', name: '📢-الإعلانات-والأخبار', type: 'text', unread: true },
    { id: '2', name: '📜-قوانين-السيرفر', type: 'text' },
    { id: '3', name: '💬-شات-عام-وسوالف', type: 'text' },
    { id: '4', name: '🎮-تنسيق-ألعاب-وتحديات', type: 'text' },
    { id: '5', name: '📸-لقطات-وميمز-المجتمع', type: 'text' },
    { id: '6', name: '🎙️ ديوانية KYLR (عام)', type: 'voice', activeCount: 6 },
    { id: '7', name: '🎙️ روم تحديات فالورانت', type: 'voice', activeCount: 4 },
    { id: '8', name: '🎙️ روم البث المباشر (VIP)', type: 'voice', activeCount: 2 },
  ],
  roles: [
    { name: 'Founder | KYLR', color: '#3b82f6', count: 1 },
    { name: 'Admin | إدارة السيرفر', color: '#60a5fa', count: 4 },
    { name: 'VIP Supporter', color: '#38bdf8', count: 42 },
    { name: 'Streamer / Content Creator', color: '#818cf8', count: 18 },
    { name: 'Gamer Member', color: '#94a3b8', count: 4185 },
  ]
};

export const DEFAULT_GAMING_SETUP: SetupSpecItem[] = [
  { id: '1', title: 'كارت الشاشة', spec: 'NVIDIA GeForce RTX 4080 Super 16GB' },
  { id: '2', title: 'المعالج', spec: 'Intel Core i9-14900K 24-Cores' },
  { id: '3', title: 'الذاكرة العشوائية (RAM)', spec: '64GB DDR5 6000MHz' },
  { id: '4', title: 'الشاشة الأساسية', spec: '27" OLED 240Hz 0.03ms QHD' },
  { id: '5', title: 'الميكروفون', spec: 'Shure SM7B + GoXLR Audio Interface' },
  { id: '6', title: 'سماعات الرأس', spec: 'Beyerdynamic DT 990 Pro' },
];

export const DEFAULT_FAVORITE_GAMES: FavoriteGameItem[] = [
  { id: '1', name: 'Valorant', genre: 'Tactical FPS', role: 'Radiant / Duelist' },
  { id: '2', name: 'GTA V / FiveM', genre: 'Roleplay', role: 'Community Host' },
  { id: '3', name: 'EA FC 25', genre: 'Sports Simulation', role: 'Ultimate Team' },
  { id: '4', name: 'Call of Duty: Warzone', genre: 'Battle Royale', role: 'Aggressive Sniper' },
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: '1',
    q: 'متى أوقات البث المباشر؟',
    a: 'أبث بشكل شبه يومي في المساء (من الساعة 8:30 مساءً بتوقيت مكة المكرمة). أعلن عن كل بث عبر سيرفر الديسكورد وستوري إنستغرام.'
  },
  {
    id: '2',
    q: 'كيف أنضم وأشارك في فعاليات السيرفر؟',
    a: 'بمجرد انضمامك لسيرفر الديسكورد عبر رابط الدعوة، اقرأ القوانين وخذ رتبتك التفاعلية لتصلك إشعارات الفعاليات والبطولات فوراً.'
  },
  {
    id: '3',
    q: 'كيف أشارك في رومات اللعب الجماعية؟',
    a: 'الرومات الصوتية مفتوحة لجميع أعضاء السيرفر، ويتم تنظيم بطولات دورية مع هدايا وجوائز للمراكز الأولى.'
  },
];

export const DEFAULT_FIVEM_CHARACTERS: FiveMCharacter[] = [
  {
    id: 'char_1',
    name: 'سعود المحمدي (SAUD)',
    alias: 'المحقق كايْلر',
    imageUrl: fivemDetectiveImg,
    role: 'رئيس وحدة التحقيقات والمباحث (CID)',
    serverName: 'سيرفر المملكة رول بلاي',
    status: 'نشط في الخدمة 🛡️',
    age: '28 سنة',
    bio: 'محقق هادئ وذكي متخصص في فك لغز القضايا المعقدة والسرقات الكبرى داخل المدينة. يتميز بالدقة العالية، القيادة الحكيمة، والقدرة على التعامل مع الأزمات والتفاوض تحت الضغط العالي مع التزامه الصارم بالقانون.',
  },
  {
    id: 'char_2',
    name: 'راكان الـكوبرا (KYLR)',
    alias: 'الشبح',
    imageUrl: fivemRacerImg,
    role: 'رجل أعمال ومتسابق محترف / تاجر سيارات',
    serverName: 'سيرفر لوس سانتوس في آي بي',
    status: 'مطلوب في المدينة 🏎️',
    age: '25 سنة',
    bio: 'شاب شغوف بسباقات الشوارع وتعديل السيارات الفارهة وتجارة المحركات الرياضية. يمتلك شبكة واسعة من العلاقات داخل المدينة ومعارض سيارات سرية، لا يتنازل عن الفوز ومواجهة أي تحدٍ في شوارع المدينة.',
  },
];

