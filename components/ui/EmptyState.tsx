interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-3 opacity-70">
        <rect x="10" y="14" width="44" height="40" rx="8" fill="#EEF0FF" />
        <rect x="10" y="14" width="44" height="12" rx="8" fill="#C7CBFA" />
        <circle cx="22" cy="8" r="3" fill="#A5ABF5" />
        <circle cx="42" cy="8" r="3" fill="#A5ABF5" />
        <path
          d="M22 38h20M22 46h12"
          stroke="#A5ABF5"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}