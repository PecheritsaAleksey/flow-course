import AuthWrapper from "@/components/Auth/AuthWrapper";

const ProtectedPage = () => {
  return (
    <AuthWrapper>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">Some protected content</div>
      </section>
    </AuthWrapper>
  );
};

export default ProtectedPage;
