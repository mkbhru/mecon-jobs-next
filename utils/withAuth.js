// utils/withAuth.js
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("/api/cms/auth/verify", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            router.push("/cms/login");
          }
        } catch (error) {
          router.push("/cms/login");
        }
      };

      checkAuth();
    }, [router]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
