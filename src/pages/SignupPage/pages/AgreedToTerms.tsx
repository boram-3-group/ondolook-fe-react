export const AgreedToTerms = () => {
  return (
    <div className="max-h-[95vh] overflow-y-auto p-4 space-y-[28px]">
      <p className="text-Display">온도룩 서비스 이용약관</p>
      <div className="w-full">
        <hr className="border-t border-grayScale-30" />
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title2 text-grayScale-70">부칙 (2025.04.10)</p>
        <p className="text-Body2 text-grayScale-60">본 약관은 2025년 4월 10일부터 적용됩니다.</p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 1조 (목적)</p>
        <p className="text-Body1 text-grayScale-70">
          본 약관은 회원(이하 “회원”)이 온도룩(이하 “회사”)이 제공하는 모바일 애플리케이션 및 관련
          서비스(이하 “서비스”)를 이용함에 있어 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 2조 (정의)</p>
        <p className="text-Body1 text-grayScale-70">
          1. "서비스"라 함은 회사가 제공하는 날씨 및 일정 기반 맞춤형 코디 추천 및 알림 제공
          서비스를 말합니다.
          <br />
          2. "회원"이라 함은 본 약관에 동의하고, 회사의 서비스에 접속하여 이용하는 자를 말합니다.
          <br />
          3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위해 회원이 설정하고 회사가 승인한 문자와
          숫자의 조합입니다.
          <br />
          4. "게시물"이란 회원이 서비스 이용 중 앱에 업로드하거나 작성한 정보(예: 피드백, 프로필,
          설정 등)를 말합니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 3조 (서비스의 내용 및 제공)</p>
        <p className="text-Body1 text-grayScale-70">
          본 서비스는 사용자의 위치 기반 날씨 정보와 연동된 캘린더 일정 데이터를 바탕으로, 해당
          상황에 적절한 코디(복장) 추천 정보를 제공합니다.
          <br />
          주요 기능은 다음과 같습니다.
          <br />
          - 위치 기반 실시간 날씨 조회
          <br />
          - 일정 기반 코디 추천 (사용자 설정 알림 포함)
          <br />
          - 마이페이지에서 성별, 선호스타일 등 설정 기반 개인화 기능
          <br />
          - 추천 알림 시간 설정 및 수정 기능
          <br />
          회사는 서비스의 안정적 제공을 위해 지속적으로 업데이트 및 개선할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 4조 (개인정보 보호)</p>
        <p className="text-Body1 text-grayScale-70">
          회사는 서비스 제공을 위해 최소한의 개인정보(이름, 생년월일, 성별, 위치정보 등)를 수집하며,
          관련 법령에 따라 보호하고 처리합니다.
          <br />
          수집된 개인정보는 서비스 제공 목적 외로 사용되지 않으며, 제3자 제공은 별도 동의를 통해서만
          이뤄집니다.
          <br />
          자세한 사항은 별도의 [개인정보 처리방침]에 따릅니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 5조 (회원가입 및 관리)</p>
        <p className="text-Body1 text-grayScale-70">
          회원가입은 소셜 로그인(카카오, 구글) 또는 자사 회원가입 절차를 통해 가능합니다.
          <br />
          회원은 정확한 정보를 제공하여야 하며, 허위 정보 등록 시 서비스 이용이 제한될 수 있습니다.
          <br />
          회원은 언제든지 마이페이지를 통해 개인정보를 수정하거나 탈퇴할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 6조 (서비스의 변경 및 중단)</p>
        <p className="text-Body1 text-grayScale-70">
          회사는 서비스 운영상 또는 기술상 필요에 따라 서비스를 변경하거나 중단할 수 있습니다.
          <br />
          변경/중단 시에는 사전 공지하며, 긴급한 경우 사후 통지할 수 있습니다.
          <br />
          서비스 중단 시 회원에게 별도의 보상을 하지 않으며, 이는 무료 서비스의 특성에 따른
          것입니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 7조 (저작권 및 콘텐츠 이용)</p>
        <p className="text-Body1 text-grayScale-70">
          온도룩에서 제공하는 콘텐츠(코디 이미지, 캐릭터, 문구 등)의 저작권은 회사에 있으며, 무단
          복제·배포를 금합니다.
          <br />
          회원이 작성한 게시물의 저작권은 해당 회원에게 있으나, 회사는 서비스 운영, 홍보 등을 위해
          필요한 범위 내에서 사용(수정·편집 포함)할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 8조 (이용 제한 및 해지)</p>
        <p className="text-Body1 text-grayScale-70">
          회원이 다음 각 호에 해당하는 경우, 회사는 사전 통지 없이 이용을 제한하거나 회원자격을
          박탈할 수 있습니다.
          <br />
          - 타인의 정보 도용
          <br />
          - 서비스 운영 방해
          <br />
          - 저작권 침해, 명예훼손 등 불법 행위
          <br />
          - 기타 법령 또는 약관 위반
          <br />
          회원은 언제든지 앱 내 마이페이지를 통해 탈퇴할 수 있으며, 탈퇴 시 개인정보는 관련 법령에
          따라 처리됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 9조 (책임의 제한)</p>
        <p className="text-Body1 text-grayScale-70">
          회사는 천재지변, 통신 장애, 기술적 결함 등 불가항력 사유로 인한 서비스 제공 중단에 대해
          책임을 지지 않습니다.
          <br />
          회사는 회원 간 혹은 회원과 제3자 간의 분쟁에 개입하지 않으며, 그로 인한 손해에 대해 책임을
          지지 않습니다.
          <br />
          회사는 무료로 제공되는 서비스와 관련하여 법령에 특별한 규정이 없는 한 손해배상 책임을 지지
          않습니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 10조 (약관의 개정)</p>
        <p className="text-Body1 text-grayScale-70">
          회사는 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정 사유를 명시하여 앱 초기 화면 또는
          알림을 통해 공지합니다.
          <br />
          개정 약관에 동의하지 않을 경우, 회원은 이용계약을 해지할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-Title1 text-grayScale-90">제 11조 (준거법 및 재판관할)</p>
        <p className="text-Body1 text-grayScale-70">
          본 약관은 대한민국 법률에 따라 해석됩니다.
          <br />
          서비스 이용과 관련하여 발생한 분쟁에 대해서는 회사의 본사 소재지를 관할하는 법원을 제1심
          관할 법원으로 합니다.
        </p>
      </div>
    </div>
  );
};
