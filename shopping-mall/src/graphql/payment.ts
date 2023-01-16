import { gql } from "graphql-request";

export const EXECUTE_PAY = gql`
  type PayInfo {
    id: !String
    amount: !Int
  }

  type PaymentInfos {
    payInfo: PayInfo[]
  }

  mutation EXECUTE_PAY($id: PaymentInfos) {
    payInfo(info: $info)
  }
`;
