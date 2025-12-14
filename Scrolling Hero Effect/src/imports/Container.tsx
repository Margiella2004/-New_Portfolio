function Frame() {
  return (
    <div className="content-stretch flex font-['Pangea_Afrikan_VAR_2.003:Regular',sans-serif] font-normal h-[36px] items-center justify-between leading-[normal] relative shrink-0 text-[rgba(75,73,73,0.86)] text-nowrap w-[1244px]">
      <p className="relative shrink-0 text-[32px] tracking-[-0.64px]" style={{ fontVariationSettings: "'ital' 0, 'XTDR' 0, 'APRT' 0, 'SPAC' 0, 'INKT' 0, 'SS01' 0, 'SS02' 0, 'SS03' 0" }}>
        Projects
      </p>
      <p className="relative shrink-0 text-[10px] tracking-[-0.2px]" style={{ fontVariationSettings: "'ital' 0, 'XTDR' 0, 'APRT' 0, 'SPAC' 0, 'INKT' 0, 'SS01' 0, 'SS02' 0, 'SS03' 0" }}>
        3 items
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1244px]">
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-start justify-center px-[22px] py-0 relative shrink-0 w-[1302px]">
      <Frame1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[76px] leading-[17px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] tracking-[-0.1504px] w-[541px]">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles One things remains constant is combing both my engineering background and Design eduction in order to build the best product for my user`}</p>
    </div>
  );
}

function Frame5() {
  return <div className="bg-[#a8a8a8] h-[320px] rounded-[26px] shrink-0 w-[397px]" />;
}

function Frame7() {
  return <div className="bg-[#a8a8a8] h-[191px] rounded-[24px] shrink-0 w-[230px]" />;
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[40px] items-end left-[544px] top-0">
      <Frame5 />
      <Frame7 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[417px]">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[30px] min-w-full relative shrink-0 text-[#232125] text-[32px] tracking-[-1.92px] w-[min-content]">Gaurdian App</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[76px] leading-[17px] relative shrink-0 text-[#9f9fa9] text-[14px] tracking-[-0.1504px] w-[416px]">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles One things remains constant is combing both my engineering background and Design eduction in order to build the best product for my user`}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#bad7a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Design</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#aaa8d7] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Research</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#d7d6a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">Engineering</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0">
      <Frame9 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[26px] items-start left-[0.5px] top-0 w-[427px]">
      <Frame15 />
      <Frame14 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[320px] relative shrink-0 w-[1229px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame12 />
        <Frame6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-start px-[38px] py-[34px] relative rounded-[32px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(99,99,99,0.17)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <Frame13 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[76px] leading-[17px] left-[22.5px] not-italic text-[#9f9fa9] text-[14px] top-[-115px] tracking-[-0.1504px] w-[541px]">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles One things remains constant is combing both my engineering background and Design eduction in order to build the best product for my user`}</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Instrument_Serif:Regular',sans-serif] h-[34px] leading-[30px] relative shrink-0 text-[#232125] text-[32px] tracking-[-1.92px] w-full">Wander App</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[17px] relative shrink-0 text-[#9f9fa9] text-[14px] tracking-[-0.1504px] w-full">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles `}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#bad7a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Design</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#aaa8d7] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Research</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0">
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame20 />
      <Frame23 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[455px]">
      <Frame18 />
    </div>
  );
}

function Frame8() {
  return <div className="bg-[#a8a8a8] h-[284px] rounded-[26px] shrink-0 w-full" />;
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full">
      <Frame16 />
      <Frame8 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Frame19 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[513px] items-start px-[37px] py-[25px] relative rounded-[32px] shrink-0 w-[629px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(99,99,99,0.17)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <Frame17 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Instrument_Serif:Regular',sans-serif] h-[34px] leading-[30px] relative shrink-0 text-[#232125] text-[32px] tracking-[-1.92px] w-full">Synechron Cube</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[17px] relative shrink-0 text-[#9f9fa9] text-[14px] tracking-[-0.1504px] w-full">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles `}</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#d7a8a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">3D Enineering</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#d7a8cc] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">Interaction Design</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0">
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame24 />
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[455px]">
      <Frame28 />
    </div>
  );
}

function Frame30() {
  return <div className="bg-[#a8a8a8] h-[284px] rounded-[26px] shrink-0 w-full" />;
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full">
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Frame31 />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute h-[82px] left-[39px] top-[40px] w-[449px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] h-[513px] items-start px-[44px] py-[25px] relative rounded-[32px] shrink-0 w-[644px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(99,99,99,0.17)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[39px] items-center relative shrink-0">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[39px] items-center relative">
        <Frame4 />
        <Container />
        <Frame2 />
      </div>
    </div>
  );
}

export default function Container3() {
  return (
    <div className="bg-white relative rounded-tl-[38.855px] rounded-tr-[38.855px] shadow-[0px_-4px_7.5px_-0.904px_rgba(0,0,0,0.07)] size-full" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center pb-[230px] pt-[40px] px-[65.059px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}