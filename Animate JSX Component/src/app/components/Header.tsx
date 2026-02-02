interface HeaderProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  bgImageUrl: string;
}

const filters = ["All", "UX/UI Design", "Creative Coding"];

export function Header({ currentFilter, onFilterChange, bgImageUrl }: HeaderProps) {
  return (
    <div className="flex flex-col items-start gap-9 w-full">
      <div className="flex flex-col items-start gap-[2px]">
        <div className="flex items-center gap-[5px]">
          <div className="w-[9px] h-[9px] bg-[#6f3d59] rounded-full animate-pulse" />
          <p className="text-[#967286] text-[12px] tracking-[-0.24px] font-sans">
            2 project underway
          </p>
        </div>
        <h1 className="text-[#393939] text-[29px] tracking-[-0.58px] font-sans">
          Projects
        </h1>
      </div>

      <div className="flex gap-5 flex-wrap">
        {filters.map((filter) => {
          const isSelected = currentFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-[25px] py-[6px] rounded-[10px] text-[16px] tracking-[-0.32px] cursor-pointer relative overflow-hidden
                ${isSelected 
                  ? 'text-white font-medium' 
                  : 'bg-transparent text-[#393939]'
                }
              `}
              style={isSelected ? {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              } : {
                transition: 'color 0.3s ease'
              }}
            >
              {isSelected && (
                <div className="absolute inset-0 rounded-[10px] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
