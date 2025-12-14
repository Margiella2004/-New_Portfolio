import svgPaths from "./svg-yy0ubkc1re";

function Frame() {
  return (
    <div className="absolute bg-[#d7d6a8] h-[31.594px] left-0 rounded-[21.789px] top-[10.89px] w-[152.524px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[40.31px] py-[6.537px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.741px] not-italic relative shrink-0 text-[13.073px] text-center text-nowrap text-white tracking-[-0.3132px]">Typography</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.089px] border-[rgba(255,255,255,0.74)] border-solid inset-0 pointer-events-none rounded-[21.789px]" />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      <Frame />
      <div className="absolute flex inset-[0_0_37.21%_84.84%] items-center justify-center">
        <div className="flex-none rotate-[195deg] scale-y-[-100%] size-[21.784px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[3.06%_8.06%_8.06%_3.06%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g id="Vector">
                  <path d={svgPaths.pe1f3e80} fill="var(--fill-0, #D7D6A8)" />
                  <path d={svgPaths.p1361c940} stroke="var(--stroke-0, white)" strokeLinejoin="bevel" strokeOpacity="0.74" strokeWidth="1.08945" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}