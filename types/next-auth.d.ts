import NextAuth from "next-auth";
type Team = {
  id: number;
  owner_id: number;
  name: string;
  logo?: string;
  address?: string;
  callback_url?: string;
  return_url?: string;
  bank_id?: string;
  status: string;
  status_disbursement: string;
  rate: string;
  uuid?: string;
  secret?: string;
  ssl_verification: boolean;
  other_bank?: string;
  settle_time: string;
  fee_charged_to: string;
  campaign_name?: string;
  created_at: string;
  updated_at: string;
};

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
      team: Team;
      token: string;
      updated_at: string;
      // ... dan properti lainnya sesuai kebutuhan
    };
  }
}
