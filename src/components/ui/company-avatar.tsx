import { cn } from '@/lib/utils';

interface CompanyAvatarProps {
  name: string;
  className?: string;
}

const colorClasses = [
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', // Success-ish
  'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300', // Reliable
  'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300', // Vibrant (Brand match)
  'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', // Creative
  'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300', // Playful
];

export function CompanyAvatar({ name, className }: CompanyAvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  // Simple hash to consistently pick a color based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colorClasses.length;

  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm',
        colorClasses[colorIndex],
        className
      )}
    >
      {initial}
    </div>
  );
}
