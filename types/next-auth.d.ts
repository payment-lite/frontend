import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        expires: string;
        user: {
            created_at: string;
            email: string;
            email_verified_at: string | null;
            exp: number;
            iat: number;
            id: number;
            jti: string;
            name: string;
            phone: string;
            team: {
                id: number;
                owner_id: number | null;
                name: string;
                logo: string;
                address: string;
                // ... dan properti lainnya sesuai kebutuhan
            }
            team_id: number | null;
            token: string;
            updated_at: string;
            // ... dan properti lainnya sesuai kebutuhan
        }
    }
}