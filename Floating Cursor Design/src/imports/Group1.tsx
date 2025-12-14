import svgPaths from "./svg-6n1rkke1mw";

function Frame() {
  return (
    <div className="absolute bg-[#bad7a8] h-[31.594px] left-[20.7px] rounded-[21.789px] top-0 w-[138.361px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[40.31px] py-[6.537px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.741px] not-italic relative shrink-0 text-[13.073px] text-center text-nowrap text-white tracking-[-0.3132px]">UI Design</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.089px] border-[rgba(255,255,255,0.74)] border-solid inset-0 pointer-events-none rounded-[21.789px]" />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      <Frame />
      <div className="absolute flex inset-[51.5%_83.23%_0_0] items-center justify-center">
        <div className="flex-none rotate-[15deg] scale-y-[-100%] size-[21.784px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[3.06%_8.06%_8.06%_3.06%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g id="Vector">
                  <path d={svgPaths.pe1f3e80} fill="var(--fill-0, #BAD7A8)" />
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