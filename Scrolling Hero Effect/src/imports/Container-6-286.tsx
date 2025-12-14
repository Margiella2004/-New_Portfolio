function Frame() {
  return <div className="bg-[#a8a8a8] h-[320px] rounded-[26px] shrink-0 w-[397px]" />;
}

function Frame2() {
  return <div className="bg-[#a8a8a8] h-[191px] rounded-[24px] shrink-0 w-[230px]" />;
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[40px] items-end left-[544px] top-0">
      <Frame />
      <Frame2 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[417px]">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[30px] min-w-full relative shrink-0 text-[32px] text-white tracking-[-1.92px] w-[min-content]">Gaurdian App</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[76px] leading-[17px] relative shrink-0 text-[#fbfbfb] text-[14px] tracking-[-0.1504px] w-[416px]">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles One things remains constant is combing both my engineering background and Design eduction in order to build the best product for my user`}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#bad7a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Design</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#aaa8d7] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">UX Research</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#d7d6a8] relative rounded-[13.217px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[21.565px] py-[7.652px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[11.826px] not-italic relative shrink-0 text-[9.739px] text-nowrap text-white tracking-[-0.1046px]">Engineering</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f1f1] border-solid inset-[-1px] pointer-events-none rounded-[14.217px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0">
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[26px] items-start left-[0.5px] top-0 w-[427px]">
      <Frame9 />
      <Frame8 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[320px] relative shrink-0 w-[1229px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Frame6 />
        <Frame1 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-gradient-to-b from-[#af4b70] relative rounded-[32px] size-full to-[#ffffff]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(99,99,99,0.17)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[38px] py-[34px] relative size-full">
          <Frame7 />
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[76px] leading-[17px] left-[22.5px] not-italic text-[#9f9fa9] text-[14px] top-[-115px] tracking-[-0.1504px] w-[541px]">{`A series of my works that are personal rpoejcts and some I have done in past  professional roles One things remains constant is combing both my engineering background and Design eduction in order to build the best product for my user`}</p>
        </div>
      </div>
    </div>
  );
}