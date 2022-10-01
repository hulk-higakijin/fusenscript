type User = {
  id: string
  firstName: string // 公式docが間違っている可能性あり
  lastName: string | null
  username: string
  profileImageUrl: string | null
  primaryEmailAddress: EmailAddress | null
  primaryEmailAddressId: string | null
  emailAddresses: EmailAddress[]
  primaryPhoneNumber: any //不明
  primaryPhoneNumberId: string | null
  phoneNumbers: PhoneNumber[]
  primaryWeb3WalletId: string | null
  web3Wallets: web3Wallets[]
  externalAccounts: ExternalAccount[]
  passwordEnabled: boolean
  publicMetadata: { [string]: any } | null
  privateMetadata: { [string]: any } | null
  unsafeMetadata: { [string]: any } | null
  lastSignInAt: string // data
  createdAt: string // data
  updatedAt: string // data
}

type EmailAddress = {
  id: string
  emailAddress: string
  verification: Verification
  linkedTo: EmailLinkedTo[]
}

type Verification = {
  status: string // "verified" or ...?
  strategy: string | null
  externalVerificationRedirectURL: any //不明
  attempts: any //不明
  expireAt: string | null
  nonce: any //不明
}

type EmailLinkedTo = {
  id: string
  type: string
}

// type PhoneNumber = {}

type ExternalAccount = {
  id: string
  provider: string
  identificationId: string
  externalId: string | null
  approvedScopes: string | null
  emailAddress: string
  firstName: string | null
  lastName: string | null
  picture: string | null
  username: string
  publicMetaData: any //不明
  label: any //不明
  verification: Verification
}
