function Frame6() {
  return <div className="absolute h-[11px] left-[1085px] top-[9px] w-[129px]" />;
}

function Frame1() {
  return (
    <div className="absolute h-[28px] left-[7px] top-[39px] w-[1214px]">
      <Frame6 />
    </div>
  );
}

function Frame3() {
  return <div className="absolute h-[28px] left-0 top-0 w-[283px]" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[558px]">
      <p className="font-['Instrument_Serif:Italic',sans-serif] italic leading-[0.704] relative shrink-0 text-[#393939] text-[40px] tracking-[-2px]">Synechron Cube</p>
      <p className="font-['Pangea_Afrikan_VAR_2.003:Text_Regular',sans-serif] font-normal leading-[1.22] relative shrink-0 text-[16px] text-black tracking-[-0.8px] w-[220px] whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'XTDR' 50, 'APRT' 100, 'SPAC' 40, 'INKT' 1, 'SS01' 1, 'SS02' 0, 'SS03' 0" }}>
        From April to May 2024, we canexpect a vibrant transition as spring unfolds. This period will be marked by blooming flowers and warmer days, inviting outdoor activities and gatherings.
      </p>
    </div>
  );
}

function Frame5() {
  return <div className="h-[11px] shrink-0 w-[129px]" />;
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 top-0 w-[1220px]">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-start left-[9px] p-[10px] top-[39px]">
      <Frame3 />
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return <div className="absolute bg-[#515151] h-[269px] left-[890px] top-[35px] w-[368px]" />;
}

function Frame9() {
  return <div className="absolute bg-[#515151] h-[183px] left-[627px] top-[121px] w-[250px]" />;
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="relative size-full">
        <Frame1 />
        <Frame2 />
        <Frame8 />
        <Frame9 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1e1e1e] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
    </div>
  );
}