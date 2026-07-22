
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 사용자 핵심 정보
 * @namespace Auth
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserPreference
 * 사용자 개인 설정
 * @namespace Auth
 */
export type UserPreference = $Result.DefaultSelection<Prisma.$UserPreferencePayload>
/**
 * Model Workspace
 * 워크스페이스 핵심 정보
 * @namespace Workspace
 */
export type Workspace = $Result.DefaultSelection<Prisma.$WorkspacePayload>
/**
 * Model WorkspaceInvitation
 * 워크스페이스 초대 정보
 * @namespace Workspace
 */
export type WorkspaceInvitation = $Result.DefaultSelection<Prisma.$WorkspaceInvitationPayload>
/**
 * Model WorkspaceMember
 * 사용자 - 워크스페이스 매핑
 * @namespace Workspace
 */
export type WorkspaceMember = $Result.DefaultSelection<Prisma.$WorkspaceMemberPayload>
/**
 * Model Chatroom
 * 워크스페이스 내부의 채팅방
 * @namespace Chat
 */
export type Chatroom = $Result.DefaultSelection<Prisma.$ChatroomPayload>
/**
 * Model ChatroomMember
 * 채팅방 참여자 정보
 * @namespace Chat
 */
export type ChatroomMember = $Result.DefaultSelection<Prisma.$ChatroomMemberPayload>
/**
 * Model ChatMessage
 * 채팅 메시지
 * @namespace Chat
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>
/**
 * Model Nano
 * Nano 정보
 * @namespace Nano
 */
export type Nano = $Result.DefaultSelection<Prisma.$NanoPayload>
/**
 * Model NanoHistory
 * Nano 이력 관리
 * @namespace Nano
 */
export type NanoHistory = $Result.DefaultSelection<Prisma.$NanoHistoryPayload>
/**
 * Model ApprovalRequest
 * 문서 결재 요청
 * @namespace Nano
 */
export type ApprovalRequest = $Result.DefaultSelection<Prisma.$ApprovalRequestPayload>
/**
 * Model PendingNano
 * 결재 대기 중인 Nano
 * @namespace Nano
 */
export type PendingNano = $Result.DefaultSelection<Prisma.$PendingNanoPayload>
/**
 * Model RefreshToken
 * Refresh Token
 * @namespace Token
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPreference`: Exposes CRUD operations for the **UserPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPreferences
    * const userPreferences = await prisma.userPreference.findMany()
    * ```
    */
  get userPreference(): Prisma.UserPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspaceInvitation`: Exposes CRUD operations for the **WorkspaceInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceInvitations
    * const workspaceInvitations = await prisma.workspaceInvitation.findMany()
    * ```
    */
  get workspaceInvitation(): Prisma.WorkspaceInvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspaceMember`: Exposes CRUD operations for the **WorkspaceMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceMembers
    * const workspaceMembers = await prisma.workspaceMember.findMany()
    * ```
    */
  get workspaceMember(): Prisma.WorkspaceMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatroom`: Exposes CRUD operations for the **Chatroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chatrooms
    * const chatrooms = await prisma.chatroom.findMany()
    * ```
    */
  get chatroom(): Prisma.ChatroomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatroomMember`: Exposes CRUD operations for the **ChatroomMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatroomMembers
    * const chatroomMembers = await prisma.chatroomMember.findMany()
    * ```
    */
  get chatroomMember(): Prisma.ChatroomMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nano`: Exposes CRUD operations for the **Nano** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nanos
    * const nanos = await prisma.nano.findMany()
    * ```
    */
  get nano(): Prisma.NanoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nanoHistory`: Exposes CRUD operations for the **NanoHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NanoHistories
    * const nanoHistories = await prisma.nanoHistory.findMany()
    * ```
    */
  get nanoHistory(): Prisma.NanoHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalRequest`: Exposes CRUD operations for the **ApprovalRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalRequests
    * const approvalRequests = await prisma.approvalRequest.findMany()
    * ```
    */
  get approvalRequest(): Prisma.ApprovalRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendingNano`: Exposes CRUD operations for the **PendingNano** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingNanos
    * const pendingNanos = await prisma.pendingNano.findMany()
    * ```
    */
  get pendingNano(): Prisma.PendingNanoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserPreference: 'UserPreference',
    Workspace: 'Workspace',
    WorkspaceInvitation: 'WorkspaceInvitation',
    WorkspaceMember: 'WorkspaceMember',
    Chatroom: 'Chatroom',
    ChatroomMember: 'ChatroomMember',
    ChatMessage: 'ChatMessage',
    Nano: 'Nano',
    NanoHistory: 'NanoHistory',
    ApprovalRequest: 'ApprovalRequest',
    PendingNano: 'PendingNano',
    RefreshToken: 'RefreshToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userPreference" | "workspace" | "workspaceInvitation" | "workspaceMember" | "chatroom" | "chatroomMember" | "chatMessage" | "nano" | "nanoHistory" | "approvalRequest" | "pendingNano" | "refreshToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserPreference: {
        payload: Prisma.$UserPreferencePayload<ExtArgs>
        fields: Prisma.UserPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          findFirst: {
            args: Prisma.UserPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          findMany: {
            args: Prisma.UserPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          create: {
            args: Prisma.UserPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          createMany: {
            args: Prisma.UserPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          delete: {
            args: Prisma.UserPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          update: {
            args: Prisma.UserPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          deleteMany: {
            args: Prisma.UserPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          upsert: {
            args: Prisma.UserPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          aggregate: {
            args: Prisma.UserPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPreference>
          }
          groupBy: {
            args: Prisma.UserPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserPreferenceCountAggregateOutputType> | number
          }
        }
      }
      Workspace: {
        payload: Prisma.$WorkspacePayload<ExtArgs>
        fields: Prisma.WorkspaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceInvitation: {
        payload: Prisma.$WorkspaceInvitationPayload<ExtArgs>
        fields: Prisma.WorkspaceInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          findFirst: {
            args: Prisma.WorkspaceInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          findMany: {
            args: Prisma.WorkspaceInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>[]
          }
          create: {
            args: Prisma.WorkspaceInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          createMany: {
            args: Prisma.WorkspaceInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>[]
          }
          delete: {
            args: Prisma.WorkspaceInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          update: {
            args: Prisma.WorkspaceInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitationPayload>
          }
          aggregate: {
            args: Prisma.WorkspaceInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceInvitation>
          }
          groupBy: {
            args: Prisma.WorkspaceInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceInvitationCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceMember: {
        payload: Prisma.$WorkspaceMemberPayload<ExtArgs>
        fields: Prisma.WorkspaceMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findFirst: {
            args: Prisma.WorkspaceMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findMany: {
            args: Prisma.WorkspaceMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          create: {
            args: Prisma.WorkspaceMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          createMany: {
            args: Prisma.WorkspaceMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          delete: {
            args: Prisma.WorkspaceMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          update: {
            args: Prisma.WorkspaceMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          aggregate: {
            args: Prisma.WorkspaceMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceMember>
          }
          groupBy: {
            args: Prisma.WorkspaceMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceMemberCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberCountAggregateOutputType> | number
          }
        }
      }
      Chatroom: {
        payload: Prisma.$ChatroomPayload<ExtArgs>
        fields: Prisma.ChatroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          findFirst: {
            args: Prisma.ChatroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          findMany: {
            args: Prisma.ChatroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>[]
          }
          create: {
            args: Prisma.ChatroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          createMany: {
            args: Prisma.ChatroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>[]
          }
          delete: {
            args: Prisma.ChatroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          update: {
            args: Prisma.ChatroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          deleteMany: {
            args: Prisma.ChatroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatroomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>[]
          }
          upsert: {
            args: Prisma.ChatroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomPayload>
          }
          aggregate: {
            args: Prisma.ChatroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatroom>
          }
          groupBy: {
            args: Prisma.ChatroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatroomCountArgs<ExtArgs>
            result: $Utils.Optional<ChatroomCountAggregateOutputType> | number
          }
        }
      }
      ChatroomMember: {
        payload: Prisma.$ChatroomMemberPayload<ExtArgs>
        fields: Prisma.ChatroomMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatroomMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatroomMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          findFirst: {
            args: Prisma.ChatroomMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatroomMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          findMany: {
            args: Prisma.ChatroomMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>[]
          }
          create: {
            args: Prisma.ChatroomMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          createMany: {
            args: Prisma.ChatroomMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatroomMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>[]
          }
          delete: {
            args: Prisma.ChatroomMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          update: {
            args: Prisma.ChatroomMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          deleteMany: {
            args: Prisma.ChatroomMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatroomMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatroomMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>[]
          }
          upsert: {
            args: Prisma.ChatroomMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatroomMemberPayload>
          }
          aggregate: {
            args: Prisma.ChatroomMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatroomMember>
          }
          groupBy: {
            args: Prisma.ChatroomMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatroomMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatroomMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ChatroomMemberCountAggregateOutputType> | number
          }
        }
      }
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
          }
        }
      }
      Nano: {
        payload: Prisma.$NanoPayload<ExtArgs>
        fields: Prisma.NanoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NanoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NanoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          findFirst: {
            args: Prisma.NanoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NanoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          findMany: {
            args: Prisma.NanoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>[]
          }
          create: {
            args: Prisma.NanoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          createMany: {
            args: Prisma.NanoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NanoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>[]
          }
          delete: {
            args: Prisma.NanoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          update: {
            args: Prisma.NanoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          deleteMany: {
            args: Prisma.NanoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NanoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NanoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>[]
          }
          upsert: {
            args: Prisma.NanoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoPayload>
          }
          aggregate: {
            args: Prisma.NanoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNano>
          }
          groupBy: {
            args: Prisma.NanoGroupByArgs<ExtArgs>
            result: $Utils.Optional<NanoGroupByOutputType>[]
          }
          count: {
            args: Prisma.NanoCountArgs<ExtArgs>
            result: $Utils.Optional<NanoCountAggregateOutputType> | number
          }
        }
      }
      NanoHistory: {
        payload: Prisma.$NanoHistoryPayload<ExtArgs>
        fields: Prisma.NanoHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NanoHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NanoHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          findFirst: {
            args: Prisma.NanoHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NanoHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          findMany: {
            args: Prisma.NanoHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>[]
          }
          create: {
            args: Prisma.NanoHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          createMany: {
            args: Prisma.NanoHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NanoHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>[]
          }
          delete: {
            args: Prisma.NanoHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          update: {
            args: Prisma.NanoHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          deleteMany: {
            args: Prisma.NanoHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NanoHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NanoHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>[]
          }
          upsert: {
            args: Prisma.NanoHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NanoHistoryPayload>
          }
          aggregate: {
            args: Prisma.NanoHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNanoHistory>
          }
          groupBy: {
            args: Prisma.NanoHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<NanoHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.NanoHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<NanoHistoryCountAggregateOutputType> | number
          }
        }
      }
      ApprovalRequest: {
        payload: Prisma.$ApprovalRequestPayload<ExtArgs>
        fields: Prisma.ApprovalRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          findFirst: {
            args: Prisma.ApprovalRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          findMany: {
            args: Prisma.ApprovalRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          create: {
            args: Prisma.ApprovalRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          createMany: {
            args: Prisma.ApprovalRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          delete: {
            args: Prisma.ApprovalRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          update: {
            args: Prisma.ApprovalRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalRequestPayload>
          }
          aggregate: {
            args: Prisma.ApprovalRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalRequest>
          }
          groupBy: {
            args: Prisma.ApprovalRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalRequestCountAggregateOutputType> | number
          }
        }
      }
      PendingNano: {
        payload: Prisma.$PendingNanoPayload<ExtArgs>
        fields: Prisma.PendingNanoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingNanoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingNanoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          findFirst: {
            args: Prisma.PendingNanoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingNanoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          findMany: {
            args: Prisma.PendingNanoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>[]
          }
          create: {
            args: Prisma.PendingNanoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          createMany: {
            args: Prisma.PendingNanoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingNanoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>[]
          }
          delete: {
            args: Prisma.PendingNanoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          update: {
            args: Prisma.PendingNanoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          deleteMany: {
            args: Prisma.PendingNanoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingNanoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendingNanoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>[]
          }
          upsert: {
            args: Prisma.PendingNanoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNanoPayload>
          }
          aggregate: {
            args: Prisma.PendingNanoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingNano>
          }
          groupBy: {
            args: Prisma.PendingNanoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingNanoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingNanoCountArgs<ExtArgs>
            result: $Utils.Optional<PendingNanoCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userPreference?: UserPreferenceOmit
    workspace?: WorkspaceOmit
    workspaceInvitation?: WorkspaceInvitationOmit
    workspaceMember?: WorkspaceMemberOmit
    chatroom?: ChatroomOmit
    chatroomMember?: ChatroomMemberOmit
    chatMessage?: ChatMessageOmit
    nano?: NanoOmit
    nanoHistory?: NanoHistoryOmit
    approvalRequest?: ApprovalRequestOmit
    pendingNano?: PendingNanoOmit
    refreshToken?: RefreshTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    workspaceMembers: number
    WorkspaceInvitations: number
    refreshTokens: number
    nanoHistorys: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspaceMembers?: boolean | UserCountOutputTypeCountWorkspaceMembersArgs
    WorkspaceInvitations?: boolean | UserCountOutputTypeCountWorkspaceInvitationsArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    nanoHistorys?: boolean | UserCountOutputTypeCountNanoHistorysArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspaceMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspaceInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNanoHistorysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoHistoryWhereInput
  }


  /**
   * Count Type WorkspaceCountOutputType
   */

  export type WorkspaceCountOutputType = {
    members: number
    invitations: number
    chatrooms: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | WorkspaceCountOutputTypeCountMembersArgs
    invitations?: boolean | WorkspaceCountOutputTypeCountInvitationsArgs
    chatrooms?: boolean | WorkspaceCountOutputTypeCountChatroomsArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceInvitationWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountChatroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatroomWhereInput
  }


  /**
   * Count Type WorkspaceMemberCountOutputType
   */

  export type WorkspaceMemberCountOutputType = {
    chatroomMembers: number
    nanos: number
  }

  export type WorkspaceMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroomMembers?: boolean | WorkspaceMemberCountOutputTypeCountChatroomMembersArgs
    nanos?: boolean | WorkspaceMemberCountOutputTypeCountNanosArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceMemberCountOutputType without action
   */
  export type WorkspaceMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMemberCountOutputType
     */
    select?: WorkspaceMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceMemberCountOutputType without action
   */
  export type WorkspaceMemberCountOutputTypeCountChatroomMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatroomMemberWhereInput
  }

  /**
   * WorkspaceMemberCountOutputType without action
   */
  export type WorkspaceMemberCountOutputTypeCountNanosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoWhereInput
  }


  /**
   * Count Type ChatroomCountOutputType
   */

  export type ChatroomCountOutputType = {
    members: number
    messages: number
  }

  export type ChatroomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ChatroomCountOutputTypeCountMembersArgs
    messages?: boolean | ChatroomCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChatroomCountOutputType without action
   */
  export type ChatroomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomCountOutputType
     */
    select?: ChatroomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatroomCountOutputType without action
   */
  export type ChatroomCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatroomMemberWhereInput
  }

  /**
   * ChatroomCountOutputType without action
   */
  export type ChatroomCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }


  /**
   * Count Type ChatroomMemberCountOutputType
   */

  export type ChatroomMemberCountOutputType = {
    messages: number
  }

  export type ChatroomMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatroomMemberCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChatroomMemberCountOutputType without action
   */
  export type ChatroomMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMemberCountOutputType
     */
    select?: ChatroomMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatroomMemberCountOutputType without action
   */
  export type ChatroomMemberCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }


  /**
   * Count Type NanoCountOutputType
   */

  export type NanoCountOutputType = {
    children: number
    histories: number
    pendingNanos: number
  }

  export type NanoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | NanoCountOutputTypeCountChildrenArgs
    histories?: boolean | NanoCountOutputTypeCountHistoriesArgs
    pendingNanos?: boolean | NanoCountOutputTypeCountPendingNanosArgs
  }

  // Custom InputTypes
  /**
   * NanoCountOutputType without action
   */
  export type NanoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoCountOutputType
     */
    select?: NanoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NanoCountOutputType without action
   */
  export type NanoCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoWhereInput
  }

  /**
   * NanoCountOutputType without action
   */
  export type NanoCountOutputTypeCountHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoHistoryWhereInput
  }

  /**
   * NanoCountOutputType without action
   */
  export type NanoCountOutputTypeCountPendingNanosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingNanoWhereInput
  }


  /**
   * Count Type NanoHistoryCountOutputType
   */

  export type NanoHistoryCountOutputType = {
    approvalRequest: number
  }

  export type NanoHistoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvalRequest?: boolean | NanoHistoryCountOutputTypeCountApprovalRequestArgs
  }

  // Custom InputTypes
  /**
   * NanoHistoryCountOutputType without action
   */
  export type NanoHistoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistoryCountOutputType
     */
    select?: NanoHistoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NanoHistoryCountOutputType without action
   */
  export type NanoHistoryCountOutputTypeCountApprovalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    provider: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    password: string | null
    firstName: string
    lastName: string | null
    provider: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    preference?: boolean | User$preferenceArgs<ExtArgs>
    workspaceMembers?: boolean | User$workspaceMembersArgs<ExtArgs>
    WorkspaceInvitations?: boolean | User$WorkspaceInvitationsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    nanoHistorys?: boolean | User$nanoHistorysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "provider" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preference?: boolean | User$preferenceArgs<ExtArgs>
    workspaceMembers?: boolean | User$workspaceMembersArgs<ExtArgs>
    WorkspaceInvitations?: boolean | User$WorkspaceInvitationsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    nanoHistorys?: boolean | User$nanoHistorysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      preference: Prisma.$UserPreferencePayload<ExtArgs> | null
      workspaceMembers: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      WorkspaceInvitations: Prisma.$WorkspaceInvitationPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      nanoHistorys: Prisma.$NanoHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      password: string | null
      firstName: string
      lastName: string | null
      provider: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preference<T extends User$preferenceArgs<ExtArgs> = {}>(args?: Subset<T, User$preferenceArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    workspaceMembers<T extends User$workspaceMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$workspaceMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    WorkspaceInvitations<T extends User$WorkspaceInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$WorkspaceInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nanoHistorys<T extends User$nanoHistorysArgs<ExtArgs> = {}>(args?: Subset<T, User$nanoHistorysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.preference
   */
  export type User$preferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    where?: UserPreferenceWhereInput
  }

  /**
   * User.workspaceMembers
   */
  export type User$workspaceMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * User.WorkspaceInvitations
   */
  export type User$WorkspaceInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    where?: WorkspaceInvitationWhereInput
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    cursor?: WorkspaceInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceInvitationScalarFieldEnum | WorkspaceInvitationScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.nanoHistorys
   */
  export type User$nanoHistorysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    where?: NanoHistoryWhereInput
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    cursor?: NanoHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NanoHistoryScalarFieldEnum | NanoHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserPreference
   */

  export type AggregateUserPreference = {
    _count: UserPreferenceCountAggregateOutputType | null
    _min: UserPreferenceMinAggregateOutputType | null
    _max: UserPreferenceMaxAggregateOutputType | null
  }

  export type UserPreferenceMinAggregateOutputType = {
    userId: string | null
    language: string | null
    theme: string | null
    timezone: string | null
  }

  export type UserPreferenceMaxAggregateOutputType = {
    userId: string | null
    language: string | null
    theme: string | null
    timezone: string | null
  }

  export type UserPreferenceCountAggregateOutputType = {
    userId: number
    language: number
    theme: number
    timezone: number
    _all: number
  }


  export type UserPreferenceMinAggregateInputType = {
    userId?: true
    language?: true
    theme?: true
    timezone?: true
  }

  export type UserPreferenceMaxAggregateInputType = {
    userId?: true
    language?: true
    theme?: true
    timezone?: true
  }

  export type UserPreferenceCountAggregateInputType = {
    userId?: true
    language?: true
    theme?: true
    timezone?: true
    _all?: true
  }

  export type UserPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreference to aggregate.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPreferences
    **/
    _count?: true | UserPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPreferenceMaxAggregateInputType
  }

  export type GetUserPreferenceAggregateType<T extends UserPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPreference[P]>
      : GetScalarType<T[P], AggregateUserPreference[P]>
  }




  export type UserPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPreferenceWhereInput
    orderBy?: UserPreferenceOrderByWithAggregationInput | UserPreferenceOrderByWithAggregationInput[]
    by: UserPreferenceScalarFieldEnum[] | UserPreferenceScalarFieldEnum
    having?: UserPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPreferenceCountAggregateInputType | true
    _min?: UserPreferenceMinAggregateInputType
    _max?: UserPreferenceMaxAggregateInputType
  }

  export type UserPreferenceGroupByOutputType = {
    userId: string
    language: string | null
    theme: string | null
    timezone: string | null
    _count: UserPreferenceCountAggregateOutputType | null
    _min: UserPreferenceMinAggregateOutputType | null
    _max: UserPreferenceMaxAggregateOutputType | null
  }

  type GetUserPreferenceGroupByPayload<T extends UserPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type UserPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    language?: boolean
    theme?: boolean
    timezone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    language?: boolean
    theme?: boolean
    timezone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    language?: boolean
    theme?: boolean
    timezone?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectScalar = {
    userId?: boolean
    language?: boolean
    theme?: boolean
    timezone?: boolean
  }

  export type UserPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "language" | "theme" | "timezone", ExtArgs["result"]["userPreference"]>
  export type UserPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPreference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      language: string | null
      theme: string | null
      timezone: string | null
    }, ExtArgs["result"]["userPreference"]>
    composites: {}
  }

  type UserPreferenceGetPayload<S extends boolean | null | undefined | UserPreferenceDefaultArgs> = $Result.GetResult<Prisma.$UserPreferencePayload, S>

  type UserPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPreferenceCountAggregateInputType | true
    }

  export interface UserPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPreference'], meta: { name: 'UserPreference' } }
    /**
     * Find zero or one UserPreference that matches the filter.
     * @param {UserPreferenceFindUniqueArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPreferenceFindUniqueArgs>(args: SelectSubset<T, UserPreferenceFindUniqueArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPreferenceFindUniqueOrThrowArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindFirstArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPreferenceFindFirstArgs>(args?: SelectSubset<T, UserPreferenceFindFirstArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindFirstOrThrowArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPreferences
     * const userPreferences = await prisma.userPreference.findMany()
     * 
     * // Get first 10 UserPreferences
     * const userPreferences = await prisma.userPreference.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userPreferenceWithUserIdOnly = await prisma.userPreference.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserPreferenceFindManyArgs>(args?: SelectSubset<T, UserPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPreference.
     * @param {UserPreferenceCreateArgs} args - Arguments to create a UserPreference.
     * @example
     * // Create one UserPreference
     * const UserPreference = await prisma.userPreference.create({
     *   data: {
     *     // ... data to create a UserPreference
     *   }
     * })
     * 
     */
    create<T extends UserPreferenceCreateArgs>(args: SelectSubset<T, UserPreferenceCreateArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPreferences.
     * @param {UserPreferenceCreateManyArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreference = await prisma.userPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPreferenceCreateManyArgs>(args?: SelectSubset<T, UserPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserPreferences and returns the data saved in the database.
     * @param {UserPreferenceCreateManyAndReturnArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreference = await prisma.userPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserPreferences and only return the `userId`
     * const userPreferenceWithUserIdOnly = await prisma.userPreference.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserPreference.
     * @param {UserPreferenceDeleteArgs} args - Arguments to delete one UserPreference.
     * @example
     * // Delete one UserPreference
     * const UserPreference = await prisma.userPreference.delete({
     *   where: {
     *     // ... filter to delete one UserPreference
     *   }
     * })
     * 
     */
    delete<T extends UserPreferenceDeleteArgs>(args: SelectSubset<T, UserPreferenceDeleteArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPreference.
     * @param {UserPreferenceUpdateArgs} args - Arguments to update one UserPreference.
     * @example
     * // Update one UserPreference
     * const userPreference = await prisma.userPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPreferenceUpdateArgs>(args: SelectSubset<T, UserPreferenceUpdateArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPreferences.
     * @param {UserPreferenceDeleteManyArgs} args - Arguments to filter UserPreferences to delete.
     * @example
     * // Delete a few UserPreferences
     * const { count } = await prisma.userPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPreferenceDeleteManyArgs>(args?: SelectSubset<T, UserPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPreferences
     * const userPreference = await prisma.userPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPreferenceUpdateManyArgs>(args: SelectSubset<T, UserPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences and returns the data updated in the database.
     * @param {UserPreferenceUpdateManyAndReturnArgs} args - Arguments to update many UserPreferences.
     * @example
     * // Update many UserPreferences
     * const userPreference = await prisma.userPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPreferences and only return the `userId`
     * const userPreferenceWithUserIdOnly = await prisma.userPreference.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserPreference.
     * @param {UserPreferenceUpsertArgs} args - Arguments to update or create a UserPreference.
     * @example
     * // Update or create a UserPreference
     * const userPreference = await prisma.userPreference.upsert({
     *   create: {
     *     // ... data to create a UserPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPreference we want to update
     *   }
     * })
     */
    upsert<T extends UserPreferenceUpsertArgs>(args: SelectSubset<T, UserPreferenceUpsertArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceCountArgs} args - Arguments to filter UserPreferences to count.
     * @example
     * // Count the number of UserPreferences
     * const count = await prisma.userPreference.count({
     *   where: {
     *     // ... the filter for the UserPreferences we want to count
     *   }
     * })
    **/
    count<T extends UserPreferenceCountArgs>(
      args?: Subset<T, UserPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPreferenceAggregateArgs>(args: Subset<T, UserPreferenceAggregateArgs>): Prisma.PrismaPromise<GetUserPreferenceAggregateType<T>>

    /**
     * Group by UserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: UserPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPreference model
   */
  readonly fields: UserPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPreference model
   */
  interface UserPreferenceFieldRefs {
    readonly userId: FieldRef<"UserPreference", 'String'>
    readonly language: FieldRef<"UserPreference", 'String'>
    readonly theme: FieldRef<"UserPreference", 'String'>
    readonly timezone: FieldRef<"UserPreference", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserPreference findUnique
   */
  export type UserPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference findUniqueOrThrow
   */
  export type UserPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference findFirst
   */
  export type UserPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference findFirstOrThrow
   */
  export type UserPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference findMany
   */
  export type UserPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference create
   */
  export type UserPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPreference.
     */
    data: XOR<UserPreferenceCreateInput, UserPreferenceUncheckedCreateInput>
  }

  /**
   * UserPreference createMany
   */
  export type UserPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferenceCreateManyInput | UserPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserPreference createManyAndReturn
   */
  export type UserPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferenceCreateManyInput | UserPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreference update
   */
  export type UserPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPreference.
     */
    data: XOR<UserPreferenceUpdateInput, UserPreferenceUncheckedUpdateInput>
    /**
     * Choose, which UserPreference to update.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference updateMany
   */
  export type UserPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
  }

  /**
   * UserPreference updateManyAndReturn
   */
  export type UserPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreference upsert
   */
  export type UserPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPreference to update in case it exists.
     */
    where: UserPreferenceWhereUniqueInput
    /**
     * In case the UserPreference found by the `where` argument doesn't exist, create a new UserPreference with this data.
     */
    create: XOR<UserPreferenceCreateInput, UserPreferenceUncheckedCreateInput>
    /**
     * In case the UserPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPreferenceUpdateInput, UserPreferenceUncheckedUpdateInput>
  }

  /**
   * UserPreference delete
   */
  export type UserPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter which UserPreference to delete.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference deleteMany
   */
  export type UserPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreferences to delete
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to delete.
     */
    limit?: number
  }

  /**
   * UserPreference without action
   */
  export type UserPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
  }


  /**
   * Model Workspace
   */

  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    logoUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    logoUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    logoUrl: number
    description: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithAggregationInput | WorkspaceOrderByWithAggregationInput[]
    by: WorkspaceScalarFieldEnum[] | WorkspaceScalarFieldEnum
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }

  export type WorkspaceGroupByOutputType = {
    id: string
    name: string
    logoUrl: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    members?: boolean | Workspace$membersArgs<ExtArgs>
    invitations?: boolean | Workspace$invitationsArgs<ExtArgs>
    chatrooms?: boolean | Workspace$chatroomsArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type WorkspaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "logoUrl" | "description" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["workspace"]>
  export type WorkspaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Workspace$membersArgs<ExtArgs>
    invitations?: boolean | Workspace$invitationsArgs<ExtArgs>
    chatrooms?: boolean | Workspace$chatroomsArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkspaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkspacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workspace"
    objects: {
      members: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      invitations: Prisma.$WorkspaceInvitationPayload<ExtArgs>[]
      chatrooms: Prisma.$ChatroomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      logoUrl: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["workspace"]>
    composites: {}
  }

  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceDefaultArgs> = $Result.GetResult<Prisma.$WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceFindUniqueArgs>(args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workspace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceFindFirstArgs>(args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceFindManyArgs>(args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
     */
    create<T extends WorkspaceCreateArgs>(args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workspaces.
     * @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceCreateManyArgs>(args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workspaces and returns the data saved in the database.
     * @param {WorkspaceCreateManyAndReturnArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceDeleteArgs>(args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceUpdateArgs>(args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceDeleteManyArgs>(args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceUpdateManyArgs>(args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces and returns the data updated in the database.
     * @param {WorkspaceUpdateManyAndReturnArgs} args - Arguments to update many Workspaces.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceUpsertArgs>(args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workspace model
   */
  readonly fields: WorkspaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Workspace$membersArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Workspace$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatrooms<T extends Workspace$chatroomsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$chatroomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workspace model
   */
  interface WorkspaceFieldRefs {
    readonly id: FieldRef<"Workspace", 'String'>
    readonly name: FieldRef<"Workspace", 'String'>
    readonly logoUrl: FieldRef<"Workspace", 'String'>
    readonly description: FieldRef<"Workspace", 'String'>
    readonly createdAt: FieldRef<"Workspace", 'DateTime'>
    readonly updatedAt: FieldRef<"Workspace", 'DateTime'>
    readonly deletedAt: FieldRef<"Workspace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workspace findUnique
   */
  export type WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findFirst
   */
  export type WorkspaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }

  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace createManyAndReturn
   */
  export type WorkspaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace updateManyAndReturn
   */
  export type WorkspaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }

  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to delete.
     */
    limit?: number
  }

  /**
   * Workspace.members
   */
  export type Workspace$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * Workspace.invitations
   */
  export type Workspace$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    where?: WorkspaceInvitationWhereInput
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    cursor?: WorkspaceInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceInvitationScalarFieldEnum | WorkspaceInvitationScalarFieldEnum[]
  }

  /**
   * Workspace.chatrooms
   */
  export type Workspace$chatroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    where?: ChatroomWhereInput
    orderBy?: ChatroomOrderByWithRelationInput | ChatroomOrderByWithRelationInput[]
    cursor?: ChatroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatroomScalarFieldEnum | ChatroomScalarFieldEnum[]
  }

  /**
   * Workspace without action
   */
  export type WorkspaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceInvitation
   */

  export type AggregateWorkspaceInvitation = {
    _count: WorkspaceInvitationCountAggregateOutputType | null
    _min: WorkspaceInvitationMinAggregateOutputType | null
    _max: WorkspaceInvitationMaxAggregateOutputType | null
  }

  export type WorkspaceInvitationMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    inviterId: string | null
    targetEmail: string | null
    invitation: string | null
    token: string | null
    status: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type WorkspaceInvitationMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    inviterId: string | null
    targetEmail: string | null
    invitation: string | null
    token: string | null
    status: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type WorkspaceInvitationCountAggregateOutputType = {
    id: number
    workspaceId: number
    inviterId: number
    targetEmail: number
    invitation: number
    token: number
    status: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type WorkspaceInvitationMinAggregateInputType = {
    id?: true
    workspaceId?: true
    inviterId?: true
    targetEmail?: true
    invitation?: true
    token?: true
    status?: true
    createdAt?: true
    expiresAt?: true
  }

  export type WorkspaceInvitationMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    inviterId?: true
    targetEmail?: true
    invitation?: true
    token?: true
    status?: true
    createdAt?: true
    expiresAt?: true
  }

  export type WorkspaceInvitationCountAggregateInputType = {
    id?: true
    workspaceId?: true
    inviterId?: true
    targetEmail?: true
    invitation?: true
    token?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type WorkspaceInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceInvitation to aggregate.
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvitations to fetch.
     */
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceInvitations
    **/
    _count?: true | WorkspaceInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceInvitationMaxAggregateInputType
  }

  export type GetWorkspaceInvitationAggregateType<T extends WorkspaceInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceInvitation[P]>
      : GetScalarType<T[P], AggregateWorkspaceInvitation[P]>
  }




  export type WorkspaceInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceInvitationWhereInput
    orderBy?: WorkspaceInvitationOrderByWithAggregationInput | WorkspaceInvitationOrderByWithAggregationInput[]
    by: WorkspaceInvitationScalarFieldEnum[] | WorkspaceInvitationScalarFieldEnum
    having?: WorkspaceInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceInvitationCountAggregateInputType | true
    _min?: WorkspaceInvitationMinAggregateInputType
    _max?: WorkspaceInvitationMaxAggregateInputType
  }

  export type WorkspaceInvitationGroupByOutputType = {
    id: string
    workspaceId: string
    inviterId: string
    targetEmail: string | null
    invitation: string | null
    token: string
    status: string | null
    createdAt: Date
    expiresAt: Date
    _count: WorkspaceInvitationCountAggregateOutputType | null
    _min: WorkspaceInvitationMinAggregateOutputType | null
    _max: WorkspaceInvitationMaxAggregateOutputType | null
  }

  type GetWorkspaceInvitationGroupByPayload<T extends WorkspaceInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceInvitationGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    inviterId?: boolean
    targetEmail?: boolean
    invitation?: boolean
    token?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvitation"]>

  export type WorkspaceInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    inviterId?: boolean
    targetEmail?: boolean
    invitation?: boolean
    token?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvitation"]>

  export type WorkspaceInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    inviterId?: boolean
    targetEmail?: boolean
    invitation?: boolean
    token?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvitation"]>

  export type WorkspaceInvitationSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    inviterId?: boolean
    targetEmail?: boolean
    invitation?: boolean
    token?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type WorkspaceInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "inviterId" | "targetEmail" | "invitation" | "token" | "status" | "createdAt" | "expiresAt", ExtArgs["result"]["workspaceInvitation"]>
  export type WorkspaceInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    inviter?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkspaceInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceInvitation"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      inviter: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      inviterId: string
      targetEmail: string | null
      invitation: string | null
      token: string
      status: string | null
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["workspaceInvitation"]>
    composites: {}
  }

  type WorkspaceInvitationGetPayload<S extends boolean | null | undefined | WorkspaceInvitationDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceInvitationPayload, S>

  type WorkspaceInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceInvitationCountAggregateInputType | true
    }

  export interface WorkspaceInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceInvitation'], meta: { name: 'WorkspaceInvitation' } }
    /**
     * Find zero or one WorkspaceInvitation that matches the filter.
     * @param {WorkspaceInvitationFindUniqueArgs} args - Arguments to find a WorkspaceInvitation
     * @example
     * // Get one WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceInvitationFindUniqueArgs>(args: SelectSubset<T, WorkspaceInvitationFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkspaceInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceInvitationFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceInvitation
     * @example
     * // Get one WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationFindFirstArgs} args - Arguments to find a WorkspaceInvitation
     * @example
     * // Get one WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceInvitationFindFirstArgs>(args?: SelectSubset<T, WorkspaceInvitationFindFirstArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationFindFirstOrThrowArgs} args - Arguments to find a WorkspaceInvitation
     * @example
     * // Get one WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkspaceInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceInvitations
     * const workspaceInvitations = await prisma.workspaceInvitation.findMany()
     * 
     * // Get first 10 WorkspaceInvitations
     * const workspaceInvitations = await prisma.workspaceInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceInvitationWithIdOnly = await prisma.workspaceInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceInvitationFindManyArgs>(args?: SelectSubset<T, WorkspaceInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkspaceInvitation.
     * @param {WorkspaceInvitationCreateArgs} args - Arguments to create a WorkspaceInvitation.
     * @example
     * // Create one WorkspaceInvitation
     * const WorkspaceInvitation = await prisma.workspaceInvitation.create({
     *   data: {
     *     // ... data to create a WorkspaceInvitation
     *   }
     * })
     * 
     */
    create<T extends WorkspaceInvitationCreateArgs>(args: SelectSubset<T, WorkspaceInvitationCreateArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkspaceInvitations.
     * @param {WorkspaceInvitationCreateManyArgs} args - Arguments to create many WorkspaceInvitations.
     * @example
     * // Create many WorkspaceInvitations
     * const workspaceInvitation = await prisma.workspaceInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceInvitationCreateManyArgs>(args?: SelectSubset<T, WorkspaceInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceInvitations and returns the data saved in the database.
     * @param {WorkspaceInvitationCreateManyAndReturnArgs} args - Arguments to create many WorkspaceInvitations.
     * @example
     * // Create many WorkspaceInvitations
     * const workspaceInvitation = await prisma.workspaceInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceInvitations and only return the `id`
     * const workspaceInvitationWithIdOnly = await prisma.workspaceInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkspaceInvitation.
     * @param {WorkspaceInvitationDeleteArgs} args - Arguments to delete one WorkspaceInvitation.
     * @example
     * // Delete one WorkspaceInvitation
     * const WorkspaceInvitation = await prisma.workspaceInvitation.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceInvitation
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceInvitationDeleteArgs>(args: SelectSubset<T, WorkspaceInvitationDeleteArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkspaceInvitation.
     * @param {WorkspaceInvitationUpdateArgs} args - Arguments to update one WorkspaceInvitation.
     * @example
     * // Update one WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceInvitationUpdateArgs>(args: SelectSubset<T, WorkspaceInvitationUpdateArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkspaceInvitations.
     * @param {WorkspaceInvitationDeleteManyArgs} args - Arguments to filter WorkspaceInvitations to delete.
     * @example
     * // Delete a few WorkspaceInvitations
     * const { count } = await prisma.workspaceInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceInvitationDeleteManyArgs>(args?: SelectSubset<T, WorkspaceInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceInvitations
     * const workspaceInvitation = await prisma.workspaceInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceInvitationUpdateManyArgs>(args: SelectSubset<T, WorkspaceInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceInvitations and returns the data updated in the database.
     * @param {WorkspaceInvitationUpdateManyAndReturnArgs} args - Arguments to update many WorkspaceInvitations.
     * @example
     * // Update many WorkspaceInvitations
     * const workspaceInvitation = await prisma.workspaceInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkspaceInvitations and only return the `id`
     * const workspaceInvitationWithIdOnly = await prisma.workspaceInvitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkspaceInvitation.
     * @param {WorkspaceInvitationUpsertArgs} args - Arguments to update or create a WorkspaceInvitation.
     * @example
     * // Update or create a WorkspaceInvitation
     * const workspaceInvitation = await prisma.workspaceInvitation.upsert({
     *   create: {
     *     // ... data to create a WorkspaceInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceInvitation we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceInvitationUpsertArgs>(args: SelectSubset<T, WorkspaceInvitationUpsertArgs<ExtArgs>>): Prisma__WorkspaceInvitationClient<$Result.GetResult<Prisma.$WorkspaceInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkspaceInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationCountArgs} args - Arguments to filter WorkspaceInvitations to count.
     * @example
     * // Count the number of WorkspaceInvitations
     * const count = await prisma.workspaceInvitation.count({
     *   where: {
     *     // ... the filter for the WorkspaceInvitations we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceInvitationCountArgs>(
      args?: Subset<T, WorkspaceInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceInvitationAggregateArgs>(args: Subset<T, WorkspaceInvitationAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceInvitationAggregateType<T>>

    /**
     * Group by WorkspaceInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceInvitationGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceInvitation model
   */
  readonly fields: WorkspaceInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    inviter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkspaceInvitation model
   */
  interface WorkspaceInvitationFieldRefs {
    readonly id: FieldRef<"WorkspaceInvitation", 'String'>
    readonly workspaceId: FieldRef<"WorkspaceInvitation", 'String'>
    readonly inviterId: FieldRef<"WorkspaceInvitation", 'String'>
    readonly targetEmail: FieldRef<"WorkspaceInvitation", 'String'>
    readonly invitation: FieldRef<"WorkspaceInvitation", 'String'>
    readonly token: FieldRef<"WorkspaceInvitation", 'String'>
    readonly status: FieldRef<"WorkspaceInvitation", 'String'>
    readonly createdAt: FieldRef<"WorkspaceInvitation", 'DateTime'>
    readonly expiresAt: FieldRef<"WorkspaceInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceInvitation findUnique
   */
  export type WorkspaceInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvitation to fetch.
     */
    where: WorkspaceInvitationWhereUniqueInput
  }

  /**
   * WorkspaceInvitation findUniqueOrThrow
   */
  export type WorkspaceInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvitation to fetch.
     */
    where: WorkspaceInvitationWhereUniqueInput
  }

  /**
   * WorkspaceInvitation findFirst
   */
  export type WorkspaceInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvitation to fetch.
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvitations to fetch.
     */
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceInvitations.
     */
    cursor?: WorkspaceInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvitations.
     */
    distinct?: WorkspaceInvitationScalarFieldEnum | WorkspaceInvitationScalarFieldEnum[]
  }

  /**
   * WorkspaceInvitation findFirstOrThrow
   */
  export type WorkspaceInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvitation to fetch.
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvitations to fetch.
     */
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceInvitations.
     */
    cursor?: WorkspaceInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvitations.
     */
    distinct?: WorkspaceInvitationScalarFieldEnum | WorkspaceInvitationScalarFieldEnum[]
  }

  /**
   * WorkspaceInvitation findMany
   */
  export type WorkspaceInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvitations to fetch.
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvitations to fetch.
     */
    orderBy?: WorkspaceInvitationOrderByWithRelationInput | WorkspaceInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceInvitations.
     */
    cursor?: WorkspaceInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvitations.
     */
    distinct?: WorkspaceInvitationScalarFieldEnum | WorkspaceInvitationScalarFieldEnum[]
  }

  /**
   * WorkspaceInvitation create
   */
  export type WorkspaceInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceInvitation.
     */
    data: XOR<WorkspaceInvitationCreateInput, WorkspaceInvitationUncheckedCreateInput>
  }

  /**
   * WorkspaceInvitation createMany
   */
  export type WorkspaceInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceInvitations.
     */
    data: WorkspaceInvitationCreateManyInput | WorkspaceInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceInvitation createManyAndReturn
   */
  export type WorkspaceInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many WorkspaceInvitations.
     */
    data: WorkspaceInvitationCreateManyInput | WorkspaceInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceInvitation update
   */
  export type WorkspaceInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceInvitation.
     */
    data: XOR<WorkspaceInvitationUpdateInput, WorkspaceInvitationUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceInvitation to update.
     */
    where: WorkspaceInvitationWhereUniqueInput
  }

  /**
   * WorkspaceInvitation updateMany
   */
  export type WorkspaceInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceInvitations.
     */
    data: XOR<WorkspaceInvitationUpdateManyMutationInput, WorkspaceInvitationUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceInvitations to update
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * Limit how many WorkspaceInvitations to update.
     */
    limit?: number
  }

  /**
   * WorkspaceInvitation updateManyAndReturn
   */
  export type WorkspaceInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * The data used to update WorkspaceInvitations.
     */
    data: XOR<WorkspaceInvitationUpdateManyMutationInput, WorkspaceInvitationUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceInvitations to update
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * Limit how many WorkspaceInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceInvitation upsert
   */
  export type WorkspaceInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceInvitation to update in case it exists.
     */
    where: WorkspaceInvitationWhereUniqueInput
    /**
     * In case the WorkspaceInvitation found by the `where` argument doesn't exist, create a new WorkspaceInvitation with this data.
     */
    create: XOR<WorkspaceInvitationCreateInput, WorkspaceInvitationUncheckedCreateInput>
    /**
     * In case the WorkspaceInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceInvitationUpdateInput, WorkspaceInvitationUncheckedUpdateInput>
  }

  /**
   * WorkspaceInvitation delete
   */
  export type WorkspaceInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceInvitation to delete.
     */
    where: WorkspaceInvitationWhereUniqueInput
  }

  /**
   * WorkspaceInvitation deleteMany
   */
  export type WorkspaceInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceInvitations to delete
     */
    where?: WorkspaceInvitationWhereInput
    /**
     * Limit how many WorkspaceInvitations to delete.
     */
    limit?: number
  }

  /**
   * WorkspaceInvitation without action
   */
  export type WorkspaceInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvitation
     */
    select?: WorkspaceInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvitation
     */
    omit?: WorkspaceInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInvitationInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceMember
   */

  export type AggregateWorkspaceMember = {
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  export type WorkspaceMemberMinAggregateOutputType = {
    workspaceId: string | null
    userId: string | null
    role: string | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberMaxAggregateOutputType = {
    workspaceId: string | null
    userId: string | null
    role: string | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberCountAggregateOutputType = {
    workspaceId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type WorkspaceMemberMinAggregateInputType = {
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberMaxAggregateInputType = {
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberCountAggregateInputType = {
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type WorkspaceMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMember to aggregate.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceMembers
    **/
    _count?: true | WorkspaceMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type GetWorkspaceMemberAggregateType<T extends WorkspaceMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceMember[P]>
      : GetScalarType<T[P], AggregateWorkspaceMember[P]>
  }




  export type WorkspaceMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithAggregationInput | WorkspaceMemberOrderByWithAggregationInput[]
    by: WorkspaceMemberScalarFieldEnum[] | WorkspaceMemberScalarFieldEnum
    having?: WorkspaceMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceMemberCountAggregateInputType | true
    _min?: WorkspaceMemberMinAggregateInputType
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type WorkspaceMemberGroupByOutputType = {
    workspaceId: string
    userId: string
    role: string | null
    joinedAt: Date
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  type GetWorkspaceMemberGroupByPayload<T extends WorkspaceMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    chatroomMembers?: boolean | WorkspaceMember$chatroomMembersArgs<ExtArgs>
    nanos?: boolean | WorkspaceMember$nanosArgs<ExtArgs>
    _count?: boolean | WorkspaceMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectScalar = {
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type WorkspaceMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"workspaceId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["workspaceMember"]>
  export type WorkspaceMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    chatroomMembers?: boolean | WorkspaceMember$chatroomMembersArgs<ExtArgs>
    nanos?: boolean | WorkspaceMember$nanosArgs<ExtArgs>
    _count?: boolean | WorkspaceMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkspaceMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceMember"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      chatroomMembers: Prisma.$ChatroomMemberPayload<ExtArgs>[]
      nanos: Prisma.$NanoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      workspaceId: string
      userId: string
      role: string | null
      joinedAt: Date
    }, ExtArgs["result"]["workspaceMember"]>
    composites: {}
  }

  type WorkspaceMemberGetPayload<S extends boolean | null | undefined | WorkspaceMemberDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceMemberPayload, S>

  type WorkspaceMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceMemberCountAggregateInputType | true
    }

  export interface WorkspaceMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceMember'], meta: { name: 'WorkspaceMember' } }
    /**
     * Find zero or one WorkspaceMember that matches the filter.
     * @param {WorkspaceMemberFindUniqueArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceMemberFindUniqueArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkspaceMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceMemberFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceMemberFindFirstArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkspaceMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany()
     * 
     * // Get first 10 WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany({ take: 10 })
     * 
     * // Only select the `workspaceId`
     * const workspaceMemberWithWorkspaceIdOnly = await prisma.workspaceMember.findMany({ select: { workspaceId: true } })
     * 
     */
    findMany<T extends WorkspaceMemberFindManyArgs>(args?: SelectSubset<T, WorkspaceMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkspaceMember.
     * @param {WorkspaceMemberCreateArgs} args - Arguments to create a WorkspaceMember.
     * @example
     * // Create one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.create({
     *   data: {
     *     // ... data to create a WorkspaceMember
     *   }
     * })
     * 
     */
    create<T extends WorkspaceMemberCreateArgs>(args: SelectSubset<T, WorkspaceMemberCreateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkspaceMembers.
     * @param {WorkspaceMemberCreateManyArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceMemberCreateManyArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceMembers and returns the data saved in the database.
     * @param {WorkspaceMemberCreateManyAndReturnArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceMembers and only return the `workspaceId`
     * const workspaceMemberWithWorkspaceIdOnly = await prisma.workspaceMember.createManyAndReturn({
     *   select: { workspaceId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkspaceMember.
     * @param {WorkspaceMemberDeleteArgs} args - Arguments to delete one WorkspaceMember.
     * @example
     * // Delete one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceMember
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceMemberDeleteArgs>(args: SelectSubset<T, WorkspaceMemberDeleteArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkspaceMember.
     * @param {WorkspaceMemberUpdateArgs} args - Arguments to update one WorkspaceMember.
     * @example
     * // Update one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceMemberUpdateArgs>(args: SelectSubset<T, WorkspaceMemberUpdateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkspaceMembers.
     * @param {WorkspaceMemberDeleteManyArgs} args - Arguments to filter WorkspaceMembers to delete.
     * @example
     * // Delete a few WorkspaceMembers
     * const { count } = await prisma.workspaceMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceMemberDeleteManyArgs>(args?: SelectSubset<T, WorkspaceMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceMemberUpdateManyArgs>(args: SelectSubset<T, WorkspaceMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceMembers and returns the data updated in the database.
     * @param {WorkspaceMemberUpdateManyAndReturnArgs} args - Arguments to update many WorkspaceMembers.
     * @example
     * // Update many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkspaceMembers and only return the `workspaceId`
     * const workspaceMemberWithWorkspaceIdOnly = await prisma.workspaceMember.updateManyAndReturn({
     *   select: { workspaceId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkspaceMember.
     * @param {WorkspaceMemberUpsertArgs} args - Arguments to update or create a WorkspaceMember.
     * @example
     * // Update or create a WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.upsert({
     *   create: {
     *     // ... data to create a WorkspaceMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceMember we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceMemberUpsertArgs>(args: SelectSubset<T, WorkspaceMemberUpsertArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberCountArgs} args - Arguments to filter WorkspaceMembers to count.
     * @example
     * // Count the number of WorkspaceMembers
     * const count = await prisma.workspaceMember.count({
     *   where: {
     *     // ... the filter for the WorkspaceMembers we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceMemberCountArgs>(
      args?: Subset<T, WorkspaceMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceMemberAggregateArgs>(args: Subset<T, WorkspaceMemberAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceMemberAggregateType<T>>

    /**
     * Group by WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceMemberGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceMember model
   */
  readonly fields: WorkspaceMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chatroomMembers<T extends WorkspaceMember$chatroomMembersArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceMember$chatroomMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nanos<T extends WorkspaceMember$nanosArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceMember$nanosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkspaceMember model
   */
  interface WorkspaceMemberFieldRefs {
    readonly workspaceId: FieldRef<"WorkspaceMember", 'String'>
    readonly userId: FieldRef<"WorkspaceMember", 'String'>
    readonly role: FieldRef<"WorkspaceMember", 'String'>
    readonly joinedAt: FieldRef<"WorkspaceMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceMember findUnique
   */
  export type WorkspaceMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findUniqueOrThrow
   */
  export type WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findFirst
   */
  export type WorkspaceMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findFirstOrThrow
   */
  export type WorkspaceMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findMany
   */
  export type WorkspaceMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMembers to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember create
   */
  export type WorkspaceMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
  }

  /**
   * WorkspaceMember createMany
   */
  export type WorkspaceMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceMember createManyAndReturn
   */
  export type WorkspaceMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceMember update
   */
  export type WorkspaceMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceMember to update.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember updateMany
   */
  export type WorkspaceMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceMembers.
     */
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceMembers to update
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to update.
     */
    limit?: number
  }

  /**
   * WorkspaceMember updateManyAndReturn
   */
  export type WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * The data used to update WorkspaceMembers.
     */
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceMembers to update
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceMember upsert
   */
  export type WorkspaceMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceMember to update in case it exists.
     */
    where: WorkspaceMemberWhereUniqueInput
    /**
     * In case the WorkspaceMember found by the `where` argument doesn't exist, create a new WorkspaceMember with this data.
     */
    create: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
    /**
     * In case the WorkspaceMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
  }

  /**
   * WorkspaceMember delete
   */
  export type WorkspaceMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceMember to delete.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember deleteMany
   */
  export type WorkspaceMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMembers to delete
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to delete.
     */
    limit?: number
  }

  /**
   * WorkspaceMember.chatroomMembers
   */
  export type WorkspaceMember$chatroomMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    where?: ChatroomMemberWhereInput
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    cursor?: ChatroomMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatroomMemberScalarFieldEnum | ChatroomMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember.nanos
   */
  export type WorkspaceMember$nanosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    where?: NanoWhereInput
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    cursor?: NanoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NanoScalarFieldEnum | NanoScalarFieldEnum[]
  }

  /**
   * WorkspaceMember without action
   */
  export type WorkspaceMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
  }


  /**
   * Model Chatroom
   */

  export type AggregateChatroom = {
    _count: ChatroomCountAggregateOutputType | null
    _min: ChatroomMinAggregateOutputType | null
    _max: ChatroomMaxAggregateOutputType | null
  }

  export type ChatroomMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    title: string | null
    description: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatroomMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    title: string | null
    description: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatroomCountAggregateOutputType = {
    id: number
    workspaceId: number
    title: number
    description: number
    isPrivate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatroomMinAggregateInputType = {
    id?: true
    workspaceId?: true
    title?: true
    description?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatroomMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    title?: true
    description?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatroomCountAggregateInputType = {
    id?: true
    workspaceId?: true
    title?: true
    description?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chatroom to aggregate.
     */
    where?: ChatroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatrooms to fetch.
     */
    orderBy?: ChatroomOrderByWithRelationInput | ChatroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chatrooms
    **/
    _count?: true | ChatroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatroomMaxAggregateInputType
  }

  export type GetChatroomAggregateType<T extends ChatroomAggregateArgs> = {
        [P in keyof T & keyof AggregateChatroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatroom[P]>
      : GetScalarType<T[P], AggregateChatroom[P]>
  }




  export type ChatroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatroomWhereInput
    orderBy?: ChatroomOrderByWithAggregationInput | ChatroomOrderByWithAggregationInput[]
    by: ChatroomScalarFieldEnum[] | ChatroomScalarFieldEnum
    having?: ChatroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatroomCountAggregateInputType | true
    _min?: ChatroomMinAggregateInputType
    _max?: ChatroomMaxAggregateInputType
  }

  export type ChatroomGroupByOutputType = {
    id: string
    workspaceId: string
    title: string | null
    description: string | null
    isPrivate: boolean
    createdAt: Date
    updatedAt: Date
    _count: ChatroomCountAggregateOutputType | null
    _min: ChatroomMinAggregateOutputType | null
    _max: ChatroomMaxAggregateOutputType | null
  }

  type GetChatroomGroupByPayload<T extends ChatroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatroomGroupByOutputType[P]>
            : GetScalarType<T[P], ChatroomGroupByOutputType[P]>
        }
      >
    >


  export type ChatroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    title?: boolean
    description?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    members?: boolean | Chatroom$membersArgs<ExtArgs>
    messages?: boolean | Chatroom$messagesArgs<ExtArgs>
    _count?: boolean | ChatroomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroom"]>

  export type ChatroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    title?: boolean
    description?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroom"]>

  export type ChatroomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    title?: boolean
    description?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroom"]>

  export type ChatroomSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    title?: boolean
    description?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatroomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "title" | "description" | "isPrivate" | "createdAt" | "updatedAt", ExtArgs["result"]["chatroom"]>
  export type ChatroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    members?: boolean | Chatroom$membersArgs<ExtArgs>
    messages?: boolean | Chatroom$messagesArgs<ExtArgs>
    _count?: boolean | ChatroomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatroomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type ChatroomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $ChatroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chatroom"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      members: Prisma.$ChatroomMemberPayload<ExtArgs>[]
      messages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      title: string | null
      description: string | null
      isPrivate: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatroom"]>
    composites: {}
  }

  type ChatroomGetPayload<S extends boolean | null | undefined | ChatroomDefaultArgs> = $Result.GetResult<Prisma.$ChatroomPayload, S>

  type ChatroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatroomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatroomCountAggregateInputType | true
    }

  export interface ChatroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chatroom'], meta: { name: 'Chatroom' } }
    /**
     * Find zero or one Chatroom that matches the filter.
     * @param {ChatroomFindUniqueArgs} args - Arguments to find a Chatroom
     * @example
     * // Get one Chatroom
     * const chatroom = await prisma.chatroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatroomFindUniqueArgs>(args: SelectSubset<T, ChatroomFindUniqueArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chatroom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatroomFindUniqueOrThrowArgs} args - Arguments to find a Chatroom
     * @example
     * // Get one Chatroom
     * const chatroom = await prisma.chatroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomFindFirstArgs} args - Arguments to find a Chatroom
     * @example
     * // Get one Chatroom
     * const chatroom = await prisma.chatroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatroomFindFirstArgs>(args?: SelectSubset<T, ChatroomFindFirstArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomFindFirstOrThrowArgs} args - Arguments to find a Chatroom
     * @example
     * // Get one Chatroom
     * const chatroom = await prisma.chatroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chatrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chatrooms
     * const chatrooms = await prisma.chatroom.findMany()
     * 
     * // Get first 10 Chatrooms
     * const chatrooms = await prisma.chatroom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatroomWithIdOnly = await prisma.chatroom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatroomFindManyArgs>(args?: SelectSubset<T, ChatroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chatroom.
     * @param {ChatroomCreateArgs} args - Arguments to create a Chatroom.
     * @example
     * // Create one Chatroom
     * const Chatroom = await prisma.chatroom.create({
     *   data: {
     *     // ... data to create a Chatroom
     *   }
     * })
     * 
     */
    create<T extends ChatroomCreateArgs>(args: SelectSubset<T, ChatroomCreateArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chatrooms.
     * @param {ChatroomCreateManyArgs} args - Arguments to create many Chatrooms.
     * @example
     * // Create many Chatrooms
     * const chatroom = await prisma.chatroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatroomCreateManyArgs>(args?: SelectSubset<T, ChatroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chatrooms and returns the data saved in the database.
     * @param {ChatroomCreateManyAndReturnArgs} args - Arguments to create many Chatrooms.
     * @example
     * // Create many Chatrooms
     * const chatroom = await prisma.chatroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chatrooms and only return the `id`
     * const chatroomWithIdOnly = await prisma.chatroom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatroomCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chatroom.
     * @param {ChatroomDeleteArgs} args - Arguments to delete one Chatroom.
     * @example
     * // Delete one Chatroom
     * const Chatroom = await prisma.chatroom.delete({
     *   where: {
     *     // ... filter to delete one Chatroom
     *   }
     * })
     * 
     */
    delete<T extends ChatroomDeleteArgs>(args: SelectSubset<T, ChatroomDeleteArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chatroom.
     * @param {ChatroomUpdateArgs} args - Arguments to update one Chatroom.
     * @example
     * // Update one Chatroom
     * const chatroom = await prisma.chatroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatroomUpdateArgs>(args: SelectSubset<T, ChatroomUpdateArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chatrooms.
     * @param {ChatroomDeleteManyArgs} args - Arguments to filter Chatrooms to delete.
     * @example
     * // Delete a few Chatrooms
     * const { count } = await prisma.chatroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatroomDeleteManyArgs>(args?: SelectSubset<T, ChatroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chatrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chatrooms
     * const chatroom = await prisma.chatroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatroomUpdateManyArgs>(args: SelectSubset<T, ChatroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chatrooms and returns the data updated in the database.
     * @param {ChatroomUpdateManyAndReturnArgs} args - Arguments to update many Chatrooms.
     * @example
     * // Update many Chatrooms
     * const chatroom = await prisma.chatroom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chatrooms and only return the `id`
     * const chatroomWithIdOnly = await prisma.chatroom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatroomUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatroomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chatroom.
     * @param {ChatroomUpsertArgs} args - Arguments to update or create a Chatroom.
     * @example
     * // Update or create a Chatroom
     * const chatroom = await prisma.chatroom.upsert({
     *   create: {
     *     // ... data to create a Chatroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chatroom we want to update
     *   }
     * })
     */
    upsert<T extends ChatroomUpsertArgs>(args: SelectSubset<T, ChatroomUpsertArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chatrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomCountArgs} args - Arguments to filter Chatrooms to count.
     * @example
     * // Count the number of Chatrooms
     * const count = await prisma.chatroom.count({
     *   where: {
     *     // ... the filter for the Chatrooms we want to count
     *   }
     * })
    **/
    count<T extends ChatroomCountArgs>(
      args?: Subset<T, ChatroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chatroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatroomAggregateArgs>(args: Subset<T, ChatroomAggregateArgs>): Prisma.PrismaPromise<GetChatroomAggregateType<T>>

    /**
     * Group by Chatroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatroomGroupByArgs['orderBy'] }
        : { orderBy?: ChatroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chatroom model
   */
  readonly fields: ChatroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chatroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Chatroom$membersArgs<ExtArgs> = {}>(args?: Subset<T, Chatroom$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Chatroom$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Chatroom$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chatroom model
   */
  interface ChatroomFieldRefs {
    readonly id: FieldRef<"Chatroom", 'String'>
    readonly workspaceId: FieldRef<"Chatroom", 'String'>
    readonly title: FieldRef<"Chatroom", 'String'>
    readonly description: FieldRef<"Chatroom", 'String'>
    readonly isPrivate: FieldRef<"Chatroom", 'Boolean'>
    readonly createdAt: FieldRef<"Chatroom", 'DateTime'>
    readonly updatedAt: FieldRef<"Chatroom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chatroom findUnique
   */
  export type ChatroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter, which Chatroom to fetch.
     */
    where: ChatroomWhereUniqueInput
  }

  /**
   * Chatroom findUniqueOrThrow
   */
  export type ChatroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter, which Chatroom to fetch.
     */
    where: ChatroomWhereUniqueInput
  }

  /**
   * Chatroom findFirst
   */
  export type ChatroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter, which Chatroom to fetch.
     */
    where?: ChatroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatrooms to fetch.
     */
    orderBy?: ChatroomOrderByWithRelationInput | ChatroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chatrooms.
     */
    cursor?: ChatroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chatrooms.
     */
    distinct?: ChatroomScalarFieldEnum | ChatroomScalarFieldEnum[]
  }

  /**
   * Chatroom findFirstOrThrow
   */
  export type ChatroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter, which Chatroom to fetch.
     */
    where?: ChatroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatrooms to fetch.
     */
    orderBy?: ChatroomOrderByWithRelationInput | ChatroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chatrooms.
     */
    cursor?: ChatroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chatrooms.
     */
    distinct?: ChatroomScalarFieldEnum | ChatroomScalarFieldEnum[]
  }

  /**
   * Chatroom findMany
   */
  export type ChatroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter, which Chatrooms to fetch.
     */
    where?: ChatroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatrooms to fetch.
     */
    orderBy?: ChatroomOrderByWithRelationInput | ChatroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chatrooms.
     */
    cursor?: ChatroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chatrooms.
     */
    distinct?: ChatroomScalarFieldEnum | ChatroomScalarFieldEnum[]
  }

  /**
   * Chatroom create
   */
  export type ChatroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * The data needed to create a Chatroom.
     */
    data: XOR<ChatroomCreateInput, ChatroomUncheckedCreateInput>
  }

  /**
   * Chatroom createMany
   */
  export type ChatroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chatrooms.
     */
    data: ChatroomCreateManyInput | ChatroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chatroom createManyAndReturn
   */
  export type ChatroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * The data used to create many Chatrooms.
     */
    data: ChatroomCreateManyInput | ChatroomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chatroom update
   */
  export type ChatroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * The data needed to update a Chatroom.
     */
    data: XOR<ChatroomUpdateInput, ChatroomUncheckedUpdateInput>
    /**
     * Choose, which Chatroom to update.
     */
    where: ChatroomWhereUniqueInput
  }

  /**
   * Chatroom updateMany
   */
  export type ChatroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chatrooms.
     */
    data: XOR<ChatroomUpdateManyMutationInput, ChatroomUncheckedUpdateManyInput>
    /**
     * Filter which Chatrooms to update
     */
    where?: ChatroomWhereInput
    /**
     * Limit how many Chatrooms to update.
     */
    limit?: number
  }

  /**
   * Chatroom updateManyAndReturn
   */
  export type ChatroomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * The data used to update Chatrooms.
     */
    data: XOR<ChatroomUpdateManyMutationInput, ChatroomUncheckedUpdateManyInput>
    /**
     * Filter which Chatrooms to update
     */
    where?: ChatroomWhereInput
    /**
     * Limit how many Chatrooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chatroom upsert
   */
  export type ChatroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * The filter to search for the Chatroom to update in case it exists.
     */
    where: ChatroomWhereUniqueInput
    /**
     * In case the Chatroom found by the `where` argument doesn't exist, create a new Chatroom with this data.
     */
    create: XOR<ChatroomCreateInput, ChatroomUncheckedCreateInput>
    /**
     * In case the Chatroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatroomUpdateInput, ChatroomUncheckedUpdateInput>
  }

  /**
   * Chatroom delete
   */
  export type ChatroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
    /**
     * Filter which Chatroom to delete.
     */
    where: ChatroomWhereUniqueInput
  }

  /**
   * Chatroom deleteMany
   */
  export type ChatroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chatrooms to delete
     */
    where?: ChatroomWhereInput
    /**
     * Limit how many Chatrooms to delete.
     */
    limit?: number
  }

  /**
   * Chatroom.members
   */
  export type Chatroom$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    where?: ChatroomMemberWhereInput
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    cursor?: ChatroomMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatroomMemberScalarFieldEnum | ChatroomMemberScalarFieldEnum[]
  }

  /**
   * Chatroom.messages
   */
  export type Chatroom$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * Chatroom without action
   */
  export type ChatroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatroom
     */
    select?: ChatroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatroom
     */
    omit?: ChatroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomInclude<ExtArgs> | null
  }


  /**
   * Model ChatroomMember
   */

  export type AggregateChatroomMember = {
    _count: ChatroomMemberCountAggregateOutputType | null
    _min: ChatroomMemberMinAggregateOutputType | null
    _max: ChatroomMemberMaxAggregateOutputType | null
  }

  export type ChatroomMemberMinAggregateOutputType = {
    chatroomId: string | null
    userId: string | null
    workspaceId: string | null
    role: string | null
    lastReadMessageId: string | null
    lastReadAt: Date | null
    joinedAt: Date | null
  }

  export type ChatroomMemberMaxAggregateOutputType = {
    chatroomId: string | null
    userId: string | null
    workspaceId: string | null
    role: string | null
    lastReadMessageId: string | null
    lastReadAt: Date | null
    joinedAt: Date | null
  }

  export type ChatroomMemberCountAggregateOutputType = {
    chatroomId: number
    userId: number
    workspaceId: number
    role: number
    lastReadMessageId: number
    lastReadAt: number
    joinedAt: number
    _all: number
  }


  export type ChatroomMemberMinAggregateInputType = {
    chatroomId?: true
    userId?: true
    workspaceId?: true
    role?: true
    lastReadMessageId?: true
    lastReadAt?: true
    joinedAt?: true
  }

  export type ChatroomMemberMaxAggregateInputType = {
    chatroomId?: true
    userId?: true
    workspaceId?: true
    role?: true
    lastReadMessageId?: true
    lastReadAt?: true
    joinedAt?: true
  }

  export type ChatroomMemberCountAggregateInputType = {
    chatroomId?: true
    userId?: true
    workspaceId?: true
    role?: true
    lastReadMessageId?: true
    lastReadAt?: true
    joinedAt?: true
    _all?: true
  }

  export type ChatroomMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatroomMember to aggregate.
     */
    where?: ChatroomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatroomMembers to fetch.
     */
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatroomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatroomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatroomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatroomMembers
    **/
    _count?: true | ChatroomMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatroomMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatroomMemberMaxAggregateInputType
  }

  export type GetChatroomMemberAggregateType<T extends ChatroomMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateChatroomMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatroomMember[P]>
      : GetScalarType<T[P], AggregateChatroomMember[P]>
  }




  export type ChatroomMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatroomMemberWhereInput
    orderBy?: ChatroomMemberOrderByWithAggregationInput | ChatroomMemberOrderByWithAggregationInput[]
    by: ChatroomMemberScalarFieldEnum[] | ChatroomMemberScalarFieldEnum
    having?: ChatroomMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatroomMemberCountAggregateInputType | true
    _min?: ChatroomMemberMinAggregateInputType
    _max?: ChatroomMemberMaxAggregateInputType
  }

  export type ChatroomMemberGroupByOutputType = {
    chatroomId: string
    userId: string
    workspaceId: string
    role: string | null
    lastReadMessageId: string | null
    lastReadAt: Date | null
    joinedAt: Date
    _count: ChatroomMemberCountAggregateOutputType | null
    _min: ChatroomMemberMinAggregateOutputType | null
    _max: ChatroomMemberMaxAggregateOutputType | null
  }

  type GetChatroomMemberGroupByPayload<T extends ChatroomMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatroomMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatroomMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatroomMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ChatroomMemberGroupByOutputType[P]>
        }
      >
    >


  export type ChatroomMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatroomId?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    lastReadMessageId?: boolean
    lastReadAt?: boolean
    joinedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
    messages?: boolean | ChatroomMember$messagesArgs<ExtArgs>
    _count?: boolean | ChatroomMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroomMember"]>

  export type ChatroomMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatroomId?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    lastReadMessageId?: boolean
    lastReadAt?: boolean
    joinedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroomMember"]>

  export type ChatroomMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatroomId?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    lastReadMessageId?: boolean
    lastReadAt?: boolean
    joinedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatroomMember"]>

  export type ChatroomMemberSelectScalar = {
    chatroomId?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    lastReadMessageId?: boolean
    lastReadAt?: boolean
    joinedAt?: boolean
  }

  export type ChatroomMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatroomId" | "userId" | "workspaceId" | "role" | "lastReadMessageId" | "lastReadAt" | "joinedAt", ExtArgs["result"]["chatroomMember"]>
  export type ChatroomMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
    messages?: boolean | ChatroomMember$messagesArgs<ExtArgs>
    _count?: boolean | ChatroomMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatroomMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
  }
  export type ChatroomMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    workspaceMember?: boolean | WorkspaceMemberDefaultArgs<ExtArgs>
  }

  export type $ChatroomMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatroomMember"
    objects: {
      chatroom: Prisma.$ChatroomPayload<ExtArgs>
      workspaceMember: Prisma.$WorkspaceMemberPayload<ExtArgs>
      messages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      chatroomId: string
      userId: string
      workspaceId: string
      role: string | null
      lastReadMessageId: string | null
      lastReadAt: Date | null
      joinedAt: Date
    }, ExtArgs["result"]["chatroomMember"]>
    composites: {}
  }

  type ChatroomMemberGetPayload<S extends boolean | null | undefined | ChatroomMemberDefaultArgs> = $Result.GetResult<Prisma.$ChatroomMemberPayload, S>

  type ChatroomMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatroomMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatroomMemberCountAggregateInputType | true
    }

  export interface ChatroomMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatroomMember'], meta: { name: 'ChatroomMember' } }
    /**
     * Find zero or one ChatroomMember that matches the filter.
     * @param {ChatroomMemberFindUniqueArgs} args - Arguments to find a ChatroomMember
     * @example
     * // Get one ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatroomMemberFindUniqueArgs>(args: SelectSubset<T, ChatroomMemberFindUniqueArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatroomMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatroomMemberFindUniqueOrThrowArgs} args - Arguments to find a ChatroomMember
     * @example
     * // Get one ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatroomMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatroomMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatroomMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberFindFirstArgs} args - Arguments to find a ChatroomMember
     * @example
     * // Get one ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatroomMemberFindFirstArgs>(args?: SelectSubset<T, ChatroomMemberFindFirstArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatroomMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberFindFirstOrThrowArgs} args - Arguments to find a ChatroomMember
     * @example
     * // Get one ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatroomMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatroomMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatroomMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatroomMembers
     * const chatroomMembers = await prisma.chatroomMember.findMany()
     * 
     * // Get first 10 ChatroomMembers
     * const chatroomMembers = await prisma.chatroomMember.findMany({ take: 10 })
     * 
     * // Only select the `chatroomId`
     * const chatroomMemberWithChatroomIdOnly = await prisma.chatroomMember.findMany({ select: { chatroomId: true } })
     * 
     */
    findMany<T extends ChatroomMemberFindManyArgs>(args?: SelectSubset<T, ChatroomMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatroomMember.
     * @param {ChatroomMemberCreateArgs} args - Arguments to create a ChatroomMember.
     * @example
     * // Create one ChatroomMember
     * const ChatroomMember = await prisma.chatroomMember.create({
     *   data: {
     *     // ... data to create a ChatroomMember
     *   }
     * })
     * 
     */
    create<T extends ChatroomMemberCreateArgs>(args: SelectSubset<T, ChatroomMemberCreateArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatroomMembers.
     * @param {ChatroomMemberCreateManyArgs} args - Arguments to create many ChatroomMembers.
     * @example
     * // Create many ChatroomMembers
     * const chatroomMember = await prisma.chatroomMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatroomMemberCreateManyArgs>(args?: SelectSubset<T, ChatroomMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatroomMembers and returns the data saved in the database.
     * @param {ChatroomMemberCreateManyAndReturnArgs} args - Arguments to create many ChatroomMembers.
     * @example
     * // Create many ChatroomMembers
     * const chatroomMember = await prisma.chatroomMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatroomMembers and only return the `chatroomId`
     * const chatroomMemberWithChatroomIdOnly = await prisma.chatroomMember.createManyAndReturn({
     *   select: { chatroomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatroomMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatroomMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatroomMember.
     * @param {ChatroomMemberDeleteArgs} args - Arguments to delete one ChatroomMember.
     * @example
     * // Delete one ChatroomMember
     * const ChatroomMember = await prisma.chatroomMember.delete({
     *   where: {
     *     // ... filter to delete one ChatroomMember
     *   }
     * })
     * 
     */
    delete<T extends ChatroomMemberDeleteArgs>(args: SelectSubset<T, ChatroomMemberDeleteArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatroomMember.
     * @param {ChatroomMemberUpdateArgs} args - Arguments to update one ChatroomMember.
     * @example
     * // Update one ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatroomMemberUpdateArgs>(args: SelectSubset<T, ChatroomMemberUpdateArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatroomMembers.
     * @param {ChatroomMemberDeleteManyArgs} args - Arguments to filter ChatroomMembers to delete.
     * @example
     * // Delete a few ChatroomMembers
     * const { count } = await prisma.chatroomMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatroomMemberDeleteManyArgs>(args?: SelectSubset<T, ChatroomMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatroomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatroomMembers
     * const chatroomMember = await prisma.chatroomMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatroomMemberUpdateManyArgs>(args: SelectSubset<T, ChatroomMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatroomMembers and returns the data updated in the database.
     * @param {ChatroomMemberUpdateManyAndReturnArgs} args - Arguments to update many ChatroomMembers.
     * @example
     * // Update many ChatroomMembers
     * const chatroomMember = await prisma.chatroomMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatroomMembers and only return the `chatroomId`
     * const chatroomMemberWithChatroomIdOnly = await prisma.chatroomMember.updateManyAndReturn({
     *   select: { chatroomId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatroomMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatroomMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatroomMember.
     * @param {ChatroomMemberUpsertArgs} args - Arguments to update or create a ChatroomMember.
     * @example
     * // Update or create a ChatroomMember
     * const chatroomMember = await prisma.chatroomMember.upsert({
     *   create: {
     *     // ... data to create a ChatroomMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatroomMember we want to update
     *   }
     * })
     */
    upsert<T extends ChatroomMemberUpsertArgs>(args: SelectSubset<T, ChatroomMemberUpsertArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatroomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberCountArgs} args - Arguments to filter ChatroomMembers to count.
     * @example
     * // Count the number of ChatroomMembers
     * const count = await prisma.chatroomMember.count({
     *   where: {
     *     // ... the filter for the ChatroomMembers we want to count
     *   }
     * })
    **/
    count<T extends ChatroomMemberCountArgs>(
      args?: Subset<T, ChatroomMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatroomMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatroomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatroomMemberAggregateArgs>(args: Subset<T, ChatroomMemberAggregateArgs>): Prisma.PrismaPromise<GetChatroomMemberAggregateType<T>>

    /**
     * Group by ChatroomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatroomMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatroomMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatroomMemberGroupByArgs['orderBy'] }
        : { orderBy?: ChatroomMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatroomMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatroomMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatroomMember model
   */
  readonly fields: ChatroomMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatroomMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatroomMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chatroom<T extends ChatroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatroomDefaultArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workspaceMember<T extends WorkspaceMemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceMemberDefaultArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends ChatroomMember$messagesArgs<ExtArgs> = {}>(args?: Subset<T, ChatroomMember$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatroomMember model
   */
  interface ChatroomMemberFieldRefs {
    readonly chatroomId: FieldRef<"ChatroomMember", 'String'>
    readonly userId: FieldRef<"ChatroomMember", 'String'>
    readonly workspaceId: FieldRef<"ChatroomMember", 'String'>
    readonly role: FieldRef<"ChatroomMember", 'String'>
    readonly lastReadMessageId: FieldRef<"ChatroomMember", 'String'>
    readonly lastReadAt: FieldRef<"ChatroomMember", 'DateTime'>
    readonly joinedAt: FieldRef<"ChatroomMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatroomMember findUnique
   */
  export type ChatroomMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatroomMember to fetch.
     */
    where: ChatroomMemberWhereUniqueInput
  }

  /**
   * ChatroomMember findUniqueOrThrow
   */
  export type ChatroomMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatroomMember to fetch.
     */
    where: ChatroomMemberWhereUniqueInput
  }

  /**
   * ChatroomMember findFirst
   */
  export type ChatroomMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatroomMember to fetch.
     */
    where?: ChatroomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatroomMembers to fetch.
     */
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatroomMembers.
     */
    cursor?: ChatroomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatroomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatroomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatroomMembers.
     */
    distinct?: ChatroomMemberScalarFieldEnum | ChatroomMemberScalarFieldEnum[]
  }

  /**
   * ChatroomMember findFirstOrThrow
   */
  export type ChatroomMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatroomMember to fetch.
     */
    where?: ChatroomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatroomMembers to fetch.
     */
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatroomMembers.
     */
    cursor?: ChatroomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatroomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatroomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatroomMembers.
     */
    distinct?: ChatroomMemberScalarFieldEnum | ChatroomMemberScalarFieldEnum[]
  }

  /**
   * ChatroomMember findMany
   */
  export type ChatroomMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatroomMembers to fetch.
     */
    where?: ChatroomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatroomMembers to fetch.
     */
    orderBy?: ChatroomMemberOrderByWithRelationInput | ChatroomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatroomMembers.
     */
    cursor?: ChatroomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatroomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatroomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatroomMembers.
     */
    distinct?: ChatroomMemberScalarFieldEnum | ChatroomMemberScalarFieldEnum[]
  }

  /**
   * ChatroomMember create
   */
  export type ChatroomMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatroomMember.
     */
    data: XOR<ChatroomMemberCreateInput, ChatroomMemberUncheckedCreateInput>
  }

  /**
   * ChatroomMember createMany
   */
  export type ChatroomMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatroomMembers.
     */
    data: ChatroomMemberCreateManyInput | ChatroomMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatroomMember createManyAndReturn
   */
  export type ChatroomMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ChatroomMembers.
     */
    data: ChatroomMemberCreateManyInput | ChatroomMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatroomMember update
   */
  export type ChatroomMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatroomMember.
     */
    data: XOR<ChatroomMemberUpdateInput, ChatroomMemberUncheckedUpdateInput>
    /**
     * Choose, which ChatroomMember to update.
     */
    where: ChatroomMemberWhereUniqueInput
  }

  /**
   * ChatroomMember updateMany
   */
  export type ChatroomMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatroomMembers.
     */
    data: XOR<ChatroomMemberUpdateManyMutationInput, ChatroomMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatroomMembers to update
     */
    where?: ChatroomMemberWhereInput
    /**
     * Limit how many ChatroomMembers to update.
     */
    limit?: number
  }

  /**
   * ChatroomMember updateManyAndReturn
   */
  export type ChatroomMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * The data used to update ChatroomMembers.
     */
    data: XOR<ChatroomMemberUpdateManyMutationInput, ChatroomMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatroomMembers to update
     */
    where?: ChatroomMemberWhereInput
    /**
     * Limit how many ChatroomMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatroomMember upsert
   */
  export type ChatroomMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatroomMember to update in case it exists.
     */
    where: ChatroomMemberWhereUniqueInput
    /**
     * In case the ChatroomMember found by the `where` argument doesn't exist, create a new ChatroomMember with this data.
     */
    create: XOR<ChatroomMemberCreateInput, ChatroomMemberUncheckedCreateInput>
    /**
     * In case the ChatroomMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatroomMemberUpdateInput, ChatroomMemberUncheckedUpdateInput>
  }

  /**
   * ChatroomMember delete
   */
  export type ChatroomMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
    /**
     * Filter which ChatroomMember to delete.
     */
    where: ChatroomMemberWhereUniqueInput
  }

  /**
   * ChatroomMember deleteMany
   */
  export type ChatroomMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatroomMembers to delete
     */
    where?: ChatroomMemberWhereInput
    /**
     * Limit how many ChatroomMembers to delete.
     */
    limit?: number
  }

  /**
   * ChatroomMember.messages
   */
  export type ChatroomMember$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatroomMember without action
   */
  export type ChatroomMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatroomMember
     */
    select?: ChatroomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatroomMember
     */
    omit?: ChatroomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatroomMemberInclude<ExtArgs> | null
  }


  /**
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: string | null
    chatroomId: string | null
    senderId: string | null
    content: string | null
    type: string | null
    isEdited: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: string | null
    chatroomId: string | null
    senderId: string | null
    content: string | null
    type: string | null
    isEdited: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    chatroomId: number
    senderId: number
    content: number
    type: number
    isEdited: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMessageMinAggregateInputType = {
    id?: true
    chatroomId?: true
    senderId?: true
    content?: true
    type?: true
    isEdited?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    chatroomId?: true
    senderId?: true
    content?: true
    type?: true
    isEdited?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    chatroomId?: true
    senderId?: true
    content?: true
    type?: true
    isEdited?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: string
    chatroomId: string
    senderId: string
    content: string
    type: string
    isEdited: boolean | null
    isDeleted: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatroomId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    isEdited?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatroomId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    isEdited?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatroomId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    isEdited?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectScalar = {
    id?: boolean
    chatroomId?: boolean
    senderId?: boolean
    content?: boolean
    type?: boolean
    isEdited?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatroomId" | "senderId" | "content" | "type" | "isEdited" | "isDeleted" | "createdAt" | "updatedAt", ExtArgs["result"]["chatMessage"]>
  export type ChatMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatroom?: boolean | ChatroomDefaultArgs<ExtArgs>
    sender?: boolean | ChatroomMemberDefaultArgs<ExtArgs>
  }

  export type $ChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {
      chatroom: Prisma.$ChatroomPayload<ExtArgs>
      sender: Prisma.$ChatroomMemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatroomId: string
      senderId: string
      content: string
      type: string
      isEdited: boolean | null
      isDeleted: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }

  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageFindUniqueArgs>(args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageFindFirstArgs>(args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMessageFindManyArgs>(args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCreateArgs>(args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessages.
     * @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCreateManyArgs>(args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMessages and returns the data saved in the database.
     * @param {ChatMessageCreateManyAndReturnArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageDeleteArgs>(args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageUpdateArgs>(args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageUpdateManyArgs>(args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages and returns the data updated in the database.
     * @param {ChatMessageUpdateManyAndReturnArgs} args - Arguments to update many ChatMessages.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageUpsertArgs>(args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chatroom<T extends ChatroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatroomDefaultArgs<ExtArgs>>): Prisma__ChatroomClient<$Result.GetResult<Prisma.$ChatroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends ChatroomMemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatroomMemberDefaultArgs<ExtArgs>>): Prisma__ChatroomMemberClient<$Result.GetResult<Prisma.$ChatroomMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatMessage model
   */
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'String'>
    readonly chatroomId: FieldRef<"ChatMessage", 'String'>
    readonly senderId: FieldRef<"ChatMessage", 'String'>
    readonly content: FieldRef<"ChatMessage", 'String'>
    readonly type: FieldRef<"ChatMessage", 'String'>
    readonly isEdited: FieldRef<"ChatMessage", 'Boolean'>
    readonly isDeleted: FieldRef<"ChatMessage", 'Boolean'>
    readonly createdAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }

  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMessage createManyAndReturn
   */
  export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage updateManyAndReturn
   */
  export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }

  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to delete.
     */
    limit?: number
  }

  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
  }


  /**
   * Model Nano
   */

  export type AggregateNano = {
    _count: NanoCountAggregateOutputType | null
    _avg: NanoAvgAggregateOutputType | null
    _sum: NanoSumAggregateOutputType | null
    _min: NanoMinAggregateOutputType | null
    _max: NanoMaxAggregateOutputType | null
  }

  export type NanoAvgAggregateOutputType = {
    position: number | null
    version: number | null
  }

  export type NanoSumAggregateOutputType = {
    position: number | null
    version: number | null
  }

  export type NanoMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    parentNanoId: string | null
    type: string | null
    title: string | null
    writerId: string | null
    position: number | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    parentDeletedAt: Date | null
  }

  export type NanoMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    parentNanoId: string | null
    type: string | null
    title: string | null
    writerId: string | null
    position: number | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    parentDeletedAt: Date | null
  }

  export type NanoCountAggregateOutputType = {
    id: number
    workspaceId: number
    parentNanoId: number
    type: number
    title: number
    content: number
    writerId: number
    position: number
    version: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    parentDeletedAt: number
    _all: number
  }


  export type NanoAvgAggregateInputType = {
    position?: true
    version?: true
  }

  export type NanoSumAggregateInputType = {
    position?: true
    version?: true
  }

  export type NanoMinAggregateInputType = {
    id?: true
    workspaceId?: true
    parentNanoId?: true
    type?: true
    title?: true
    writerId?: true
    position?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    parentDeletedAt?: true
  }

  export type NanoMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    parentNanoId?: true
    type?: true
    title?: true
    writerId?: true
    position?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    parentDeletedAt?: true
  }

  export type NanoCountAggregateInputType = {
    id?: true
    workspaceId?: true
    parentNanoId?: true
    type?: true
    title?: true
    content?: true
    writerId?: true
    position?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    parentDeletedAt?: true
    _all?: true
  }

  export type NanoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nano to aggregate.
     */
    where?: NanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nanos to fetch.
     */
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Nanos
    **/
    _count?: true | NanoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NanoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NanoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NanoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NanoMaxAggregateInputType
  }

  export type GetNanoAggregateType<T extends NanoAggregateArgs> = {
        [P in keyof T & keyof AggregateNano]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNano[P]>
      : GetScalarType<T[P], AggregateNano[P]>
  }




  export type NanoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoWhereInput
    orderBy?: NanoOrderByWithAggregationInput | NanoOrderByWithAggregationInput[]
    by: NanoScalarFieldEnum[] | NanoScalarFieldEnum
    having?: NanoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NanoCountAggregateInputType | true
    _avg?: NanoAvgAggregateInputType
    _sum?: NanoSumAggregateInputType
    _min?: NanoMinAggregateInputType
    _max?: NanoMaxAggregateInputType
  }

  export type NanoGroupByOutputType = {
    id: string
    workspaceId: string
    parentNanoId: string | null
    type: string | null
    title: string | null
    content: JsonValue | null
    writerId: string | null
    position: number
    version: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    parentDeletedAt: Date | null
    _count: NanoCountAggregateOutputType | null
    _avg: NanoAvgAggregateOutputType | null
    _sum: NanoSumAggregateOutputType | null
    _min: NanoMinAggregateOutputType | null
    _max: NanoMaxAggregateOutputType | null
  }

  type GetNanoGroupByPayload<T extends NanoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NanoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NanoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NanoGroupByOutputType[P]>
            : GetScalarType<T[P], NanoGroupByOutputType[P]>
        }
      >
    >


  export type NanoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    parentNanoId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    position?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    parentDeletedAt?: boolean
    parent?: boolean | Nano$parentArgs<ExtArgs>
    children?: boolean | Nano$childrenArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
    histories?: boolean | Nano$historiesArgs<ExtArgs>
    pendingNanos?: boolean | Nano$pendingNanosArgs<ExtArgs>
    _count?: boolean | NanoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nano"]>

  export type NanoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    parentNanoId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    position?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    parentDeletedAt?: boolean
    parent?: boolean | Nano$parentArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
  }, ExtArgs["result"]["nano"]>

  export type NanoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    parentNanoId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    position?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    parentDeletedAt?: boolean
    parent?: boolean | Nano$parentArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
  }, ExtArgs["result"]["nano"]>

  export type NanoSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    parentNanoId?: boolean
    type?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    position?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    parentDeletedAt?: boolean
  }

  export type NanoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "parentNanoId" | "type" | "title" | "content" | "writerId" | "position" | "version" | "createdAt" | "updatedAt" | "deletedAt" | "parentDeletedAt", ExtArgs["result"]["nano"]>
  export type NanoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Nano$parentArgs<ExtArgs>
    children?: boolean | Nano$childrenArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
    histories?: boolean | Nano$historiesArgs<ExtArgs>
    pendingNanos?: boolean | Nano$pendingNanosArgs<ExtArgs>
    _count?: boolean | NanoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NanoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Nano$parentArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
  }
  export type NanoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Nano$parentArgs<ExtArgs>
    writerMember?: boolean | Nano$writerMemberArgs<ExtArgs>
  }

  export type $NanoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Nano"
    objects: {
      parent: Prisma.$NanoPayload<ExtArgs> | null
      children: Prisma.$NanoPayload<ExtArgs>[]
      writerMember: Prisma.$WorkspaceMemberPayload<ExtArgs> | null
      histories: Prisma.$NanoHistoryPayload<ExtArgs>[]
      pendingNanos: Prisma.$PendingNanoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      parentNanoId: string | null
      type: string | null
      title: string | null
      content: Prisma.JsonValue | null
      writerId: string | null
      position: number
      version: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      parentDeletedAt: Date | null
    }, ExtArgs["result"]["nano"]>
    composites: {}
  }

  type NanoGetPayload<S extends boolean | null | undefined | NanoDefaultArgs> = $Result.GetResult<Prisma.$NanoPayload, S>

  type NanoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NanoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NanoCountAggregateInputType | true
    }

  export interface NanoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Nano'], meta: { name: 'Nano' } }
    /**
     * Find zero or one Nano that matches the filter.
     * @param {NanoFindUniqueArgs} args - Arguments to find a Nano
     * @example
     * // Get one Nano
     * const nano = await prisma.nano.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NanoFindUniqueArgs>(args: SelectSubset<T, NanoFindUniqueArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nano that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NanoFindUniqueOrThrowArgs} args - Arguments to find a Nano
     * @example
     * // Get one Nano
     * const nano = await prisma.nano.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NanoFindUniqueOrThrowArgs>(args: SelectSubset<T, NanoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nano that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoFindFirstArgs} args - Arguments to find a Nano
     * @example
     * // Get one Nano
     * const nano = await prisma.nano.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NanoFindFirstArgs>(args?: SelectSubset<T, NanoFindFirstArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nano that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoFindFirstOrThrowArgs} args - Arguments to find a Nano
     * @example
     * // Get one Nano
     * const nano = await prisma.nano.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NanoFindFirstOrThrowArgs>(args?: SelectSubset<T, NanoFindFirstOrThrowArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nanos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nanos
     * const nanos = await prisma.nano.findMany()
     * 
     * // Get first 10 Nanos
     * const nanos = await prisma.nano.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nanoWithIdOnly = await prisma.nano.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NanoFindManyArgs>(args?: SelectSubset<T, NanoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nano.
     * @param {NanoCreateArgs} args - Arguments to create a Nano.
     * @example
     * // Create one Nano
     * const Nano = await prisma.nano.create({
     *   data: {
     *     // ... data to create a Nano
     *   }
     * })
     * 
     */
    create<T extends NanoCreateArgs>(args: SelectSubset<T, NanoCreateArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nanos.
     * @param {NanoCreateManyArgs} args - Arguments to create many Nanos.
     * @example
     * // Create many Nanos
     * const nano = await prisma.nano.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NanoCreateManyArgs>(args?: SelectSubset<T, NanoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Nanos and returns the data saved in the database.
     * @param {NanoCreateManyAndReturnArgs} args - Arguments to create many Nanos.
     * @example
     * // Create many Nanos
     * const nano = await prisma.nano.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Nanos and only return the `id`
     * const nanoWithIdOnly = await prisma.nano.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NanoCreateManyAndReturnArgs>(args?: SelectSubset<T, NanoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Nano.
     * @param {NanoDeleteArgs} args - Arguments to delete one Nano.
     * @example
     * // Delete one Nano
     * const Nano = await prisma.nano.delete({
     *   where: {
     *     // ... filter to delete one Nano
     *   }
     * })
     * 
     */
    delete<T extends NanoDeleteArgs>(args: SelectSubset<T, NanoDeleteArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nano.
     * @param {NanoUpdateArgs} args - Arguments to update one Nano.
     * @example
     * // Update one Nano
     * const nano = await prisma.nano.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NanoUpdateArgs>(args: SelectSubset<T, NanoUpdateArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nanos.
     * @param {NanoDeleteManyArgs} args - Arguments to filter Nanos to delete.
     * @example
     * // Delete a few Nanos
     * const { count } = await prisma.nano.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NanoDeleteManyArgs>(args?: SelectSubset<T, NanoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nanos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nanos
     * const nano = await prisma.nano.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NanoUpdateManyArgs>(args: SelectSubset<T, NanoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nanos and returns the data updated in the database.
     * @param {NanoUpdateManyAndReturnArgs} args - Arguments to update many Nanos.
     * @example
     * // Update many Nanos
     * const nano = await prisma.nano.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Nanos and only return the `id`
     * const nanoWithIdOnly = await prisma.nano.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NanoUpdateManyAndReturnArgs>(args: SelectSubset<T, NanoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Nano.
     * @param {NanoUpsertArgs} args - Arguments to update or create a Nano.
     * @example
     * // Update or create a Nano
     * const nano = await prisma.nano.upsert({
     *   create: {
     *     // ... data to create a Nano
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nano we want to update
     *   }
     * })
     */
    upsert<T extends NanoUpsertArgs>(args: SelectSubset<T, NanoUpsertArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nanos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoCountArgs} args - Arguments to filter Nanos to count.
     * @example
     * // Count the number of Nanos
     * const count = await prisma.nano.count({
     *   where: {
     *     // ... the filter for the Nanos we want to count
     *   }
     * })
    **/
    count<T extends NanoCountArgs>(
      args?: Subset<T, NanoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NanoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NanoAggregateArgs>(args: Subset<T, NanoAggregateArgs>): Prisma.PrismaPromise<GetNanoAggregateType<T>>

    /**
     * Group by Nano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NanoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NanoGroupByArgs['orderBy'] }
        : { orderBy?: NanoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NanoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNanoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Nano model
   */
  readonly fields: NanoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Nano.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NanoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Nano$parentArgs<ExtArgs> = {}>(args?: Subset<T, Nano$parentArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Nano$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Nano$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    writerMember<T extends Nano$writerMemberArgs<ExtArgs> = {}>(args?: Subset<T, Nano$writerMemberArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    histories<T extends Nano$historiesArgs<ExtArgs> = {}>(args?: Subset<T, Nano$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendingNanos<T extends Nano$pendingNanosArgs<ExtArgs> = {}>(args?: Subset<T, Nano$pendingNanosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Nano model
   */
  interface NanoFieldRefs {
    readonly id: FieldRef<"Nano", 'String'>
    readonly workspaceId: FieldRef<"Nano", 'String'>
    readonly parentNanoId: FieldRef<"Nano", 'String'>
    readonly type: FieldRef<"Nano", 'String'>
    readonly title: FieldRef<"Nano", 'String'>
    readonly content: FieldRef<"Nano", 'Json'>
    readonly writerId: FieldRef<"Nano", 'String'>
    readonly position: FieldRef<"Nano", 'Float'>
    readonly version: FieldRef<"Nano", 'Int'>
    readonly createdAt: FieldRef<"Nano", 'DateTime'>
    readonly updatedAt: FieldRef<"Nano", 'DateTime'>
    readonly deletedAt: FieldRef<"Nano", 'DateTime'>
    readonly parentDeletedAt: FieldRef<"Nano", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Nano findUnique
   */
  export type NanoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter, which Nano to fetch.
     */
    where: NanoWhereUniqueInput
  }

  /**
   * Nano findUniqueOrThrow
   */
  export type NanoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter, which Nano to fetch.
     */
    where: NanoWhereUniqueInput
  }

  /**
   * Nano findFirst
   */
  export type NanoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter, which Nano to fetch.
     */
    where?: NanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nanos to fetch.
     */
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nanos.
     */
    cursor?: NanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nanos.
     */
    distinct?: NanoScalarFieldEnum | NanoScalarFieldEnum[]
  }

  /**
   * Nano findFirstOrThrow
   */
  export type NanoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter, which Nano to fetch.
     */
    where?: NanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nanos to fetch.
     */
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nanos.
     */
    cursor?: NanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nanos.
     */
    distinct?: NanoScalarFieldEnum | NanoScalarFieldEnum[]
  }

  /**
   * Nano findMany
   */
  export type NanoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter, which Nanos to fetch.
     */
    where?: NanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nanos to fetch.
     */
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Nanos.
     */
    cursor?: NanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nanos.
     */
    distinct?: NanoScalarFieldEnum | NanoScalarFieldEnum[]
  }

  /**
   * Nano create
   */
  export type NanoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * The data needed to create a Nano.
     */
    data: XOR<NanoCreateInput, NanoUncheckedCreateInput>
  }

  /**
   * Nano createMany
   */
  export type NanoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Nanos.
     */
    data: NanoCreateManyInput | NanoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Nano createManyAndReturn
   */
  export type NanoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * The data used to create many Nanos.
     */
    data: NanoCreateManyInput | NanoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Nano update
   */
  export type NanoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * The data needed to update a Nano.
     */
    data: XOR<NanoUpdateInput, NanoUncheckedUpdateInput>
    /**
     * Choose, which Nano to update.
     */
    where: NanoWhereUniqueInput
  }

  /**
   * Nano updateMany
   */
  export type NanoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Nanos.
     */
    data: XOR<NanoUpdateManyMutationInput, NanoUncheckedUpdateManyInput>
    /**
     * Filter which Nanos to update
     */
    where?: NanoWhereInput
    /**
     * Limit how many Nanos to update.
     */
    limit?: number
  }

  /**
   * Nano updateManyAndReturn
   */
  export type NanoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * The data used to update Nanos.
     */
    data: XOR<NanoUpdateManyMutationInput, NanoUncheckedUpdateManyInput>
    /**
     * Filter which Nanos to update
     */
    where?: NanoWhereInput
    /**
     * Limit how many Nanos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Nano upsert
   */
  export type NanoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * The filter to search for the Nano to update in case it exists.
     */
    where: NanoWhereUniqueInput
    /**
     * In case the Nano found by the `where` argument doesn't exist, create a new Nano with this data.
     */
    create: XOR<NanoCreateInput, NanoUncheckedCreateInput>
    /**
     * In case the Nano was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NanoUpdateInput, NanoUncheckedUpdateInput>
  }

  /**
   * Nano delete
   */
  export type NanoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    /**
     * Filter which Nano to delete.
     */
    where: NanoWhereUniqueInput
  }

  /**
   * Nano deleteMany
   */
  export type NanoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nanos to delete
     */
    where?: NanoWhereInput
    /**
     * Limit how many Nanos to delete.
     */
    limit?: number
  }

  /**
   * Nano.parent
   */
  export type Nano$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    where?: NanoWhereInput
  }

  /**
   * Nano.children
   */
  export type Nano$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    where?: NanoWhereInput
    orderBy?: NanoOrderByWithRelationInput | NanoOrderByWithRelationInput[]
    cursor?: NanoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NanoScalarFieldEnum | NanoScalarFieldEnum[]
  }

  /**
   * Nano.writerMember
   */
  export type Nano$writerMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
  }

  /**
   * Nano.histories
   */
  export type Nano$historiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    where?: NanoHistoryWhereInput
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    cursor?: NanoHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NanoHistoryScalarFieldEnum | NanoHistoryScalarFieldEnum[]
  }

  /**
   * Nano.pendingNanos
   */
  export type Nano$pendingNanosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    where?: PendingNanoWhereInput
    orderBy?: PendingNanoOrderByWithRelationInput | PendingNanoOrderByWithRelationInput[]
    cursor?: PendingNanoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PendingNanoScalarFieldEnum | PendingNanoScalarFieldEnum[]
  }

  /**
   * Nano without action
   */
  export type NanoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
  }


  /**
   * Model NanoHistory
   */

  export type AggregateNanoHistory = {
    _count: NanoHistoryCountAggregateOutputType | null
    _min: NanoHistoryMinAggregateOutputType | null
    _max: NanoHistoryMaxAggregateOutputType | null
  }

  export type NanoHistoryMinAggregateOutputType = {
    id: string | null
    nanoId: string | null
    version: string | null
    title: string | null
    writerId: string | null
    workspaceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NanoHistoryMaxAggregateOutputType = {
    id: string | null
    nanoId: string | null
    version: string | null
    title: string | null
    writerId: string | null
    workspaceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NanoHistoryCountAggregateOutputType = {
    id: number
    nanoId: number
    version: number
    title: number
    content: number
    writerId: number
    workspaceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NanoHistoryMinAggregateInputType = {
    id?: true
    nanoId?: true
    version?: true
    title?: true
    writerId?: true
    workspaceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NanoHistoryMaxAggregateInputType = {
    id?: true
    nanoId?: true
    version?: true
    title?: true
    writerId?: true
    workspaceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NanoHistoryCountAggregateInputType = {
    id?: true
    nanoId?: true
    version?: true
    title?: true
    content?: true
    writerId?: true
    workspaceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NanoHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NanoHistory to aggregate.
     */
    where?: NanoHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NanoHistories to fetch.
     */
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NanoHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NanoHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NanoHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NanoHistories
    **/
    _count?: true | NanoHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NanoHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NanoHistoryMaxAggregateInputType
  }

  export type GetNanoHistoryAggregateType<T extends NanoHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateNanoHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNanoHistory[P]>
      : GetScalarType<T[P], AggregateNanoHistory[P]>
  }




  export type NanoHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NanoHistoryWhereInput
    orderBy?: NanoHistoryOrderByWithAggregationInput | NanoHistoryOrderByWithAggregationInput[]
    by: NanoHistoryScalarFieldEnum[] | NanoHistoryScalarFieldEnum
    having?: NanoHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NanoHistoryCountAggregateInputType | true
    _min?: NanoHistoryMinAggregateInputType
    _max?: NanoHistoryMaxAggregateInputType
  }

  export type NanoHistoryGroupByOutputType = {
    id: string
    nanoId: string
    version: string | null
    title: string | null
    content: JsonValue | null
    writerId: string | null
    workspaceId: string
    createdAt: Date
    updatedAt: Date
    _count: NanoHistoryCountAggregateOutputType | null
    _min: NanoHistoryMinAggregateOutputType | null
    _max: NanoHistoryMaxAggregateOutputType | null
  }

  type GetNanoHistoryGroupByPayload<T extends NanoHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NanoHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NanoHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NanoHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], NanoHistoryGroupByOutputType[P]>
        }
      >
    >


  export type NanoHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    workspaceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    approvalRequest?: boolean | NanoHistory$approvalRequestArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
    _count?: boolean | NanoHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nanoHistory"]>

  export type NanoHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    workspaceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
  }, ExtArgs["result"]["nanoHistory"]>

  export type NanoHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    workspaceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
  }, ExtArgs["result"]["nanoHistory"]>

  export type NanoHistorySelectScalar = {
    id?: boolean
    nanoId?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    writerId?: boolean
    workspaceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NanoHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nanoId" | "version" | "title" | "content" | "writerId" | "workspaceId" | "createdAt" | "updatedAt", ExtArgs["result"]["nanoHistory"]>
  export type NanoHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    approvalRequest?: boolean | NanoHistory$approvalRequestArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
    _count?: boolean | NanoHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NanoHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
  }
  export type NanoHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nano?: boolean | NanoDefaultArgs<ExtArgs>
    writer?: boolean | NanoHistory$writerArgs<ExtArgs>
  }

  export type $NanoHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NanoHistory"
    objects: {
      nano: Prisma.$NanoPayload<ExtArgs>
      approvalRequest: Prisma.$ApprovalRequestPayload<ExtArgs>[]
      writer: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nanoId: string
      version: string | null
      title: string | null
      content: Prisma.JsonValue | null
      writerId: string | null
      workspaceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nanoHistory"]>
    composites: {}
  }

  type NanoHistoryGetPayload<S extends boolean | null | undefined | NanoHistoryDefaultArgs> = $Result.GetResult<Prisma.$NanoHistoryPayload, S>

  type NanoHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NanoHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NanoHistoryCountAggregateInputType | true
    }

  export interface NanoHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NanoHistory'], meta: { name: 'NanoHistory' } }
    /**
     * Find zero or one NanoHistory that matches the filter.
     * @param {NanoHistoryFindUniqueArgs} args - Arguments to find a NanoHistory
     * @example
     * // Get one NanoHistory
     * const nanoHistory = await prisma.nanoHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NanoHistoryFindUniqueArgs>(args: SelectSubset<T, NanoHistoryFindUniqueArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NanoHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NanoHistoryFindUniqueOrThrowArgs} args - Arguments to find a NanoHistory
     * @example
     * // Get one NanoHistory
     * const nanoHistory = await prisma.nanoHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NanoHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, NanoHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NanoHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryFindFirstArgs} args - Arguments to find a NanoHistory
     * @example
     * // Get one NanoHistory
     * const nanoHistory = await prisma.nanoHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NanoHistoryFindFirstArgs>(args?: SelectSubset<T, NanoHistoryFindFirstArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NanoHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryFindFirstOrThrowArgs} args - Arguments to find a NanoHistory
     * @example
     * // Get one NanoHistory
     * const nanoHistory = await prisma.nanoHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NanoHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, NanoHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NanoHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NanoHistories
     * const nanoHistories = await prisma.nanoHistory.findMany()
     * 
     * // Get first 10 NanoHistories
     * const nanoHistories = await prisma.nanoHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nanoHistoryWithIdOnly = await prisma.nanoHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NanoHistoryFindManyArgs>(args?: SelectSubset<T, NanoHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NanoHistory.
     * @param {NanoHistoryCreateArgs} args - Arguments to create a NanoHistory.
     * @example
     * // Create one NanoHistory
     * const NanoHistory = await prisma.nanoHistory.create({
     *   data: {
     *     // ... data to create a NanoHistory
     *   }
     * })
     * 
     */
    create<T extends NanoHistoryCreateArgs>(args: SelectSubset<T, NanoHistoryCreateArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NanoHistories.
     * @param {NanoHistoryCreateManyArgs} args - Arguments to create many NanoHistories.
     * @example
     * // Create many NanoHistories
     * const nanoHistory = await prisma.nanoHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NanoHistoryCreateManyArgs>(args?: SelectSubset<T, NanoHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NanoHistories and returns the data saved in the database.
     * @param {NanoHistoryCreateManyAndReturnArgs} args - Arguments to create many NanoHistories.
     * @example
     * // Create many NanoHistories
     * const nanoHistory = await prisma.nanoHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NanoHistories and only return the `id`
     * const nanoHistoryWithIdOnly = await prisma.nanoHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NanoHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, NanoHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NanoHistory.
     * @param {NanoHistoryDeleteArgs} args - Arguments to delete one NanoHistory.
     * @example
     * // Delete one NanoHistory
     * const NanoHistory = await prisma.nanoHistory.delete({
     *   where: {
     *     // ... filter to delete one NanoHistory
     *   }
     * })
     * 
     */
    delete<T extends NanoHistoryDeleteArgs>(args: SelectSubset<T, NanoHistoryDeleteArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NanoHistory.
     * @param {NanoHistoryUpdateArgs} args - Arguments to update one NanoHistory.
     * @example
     * // Update one NanoHistory
     * const nanoHistory = await prisma.nanoHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NanoHistoryUpdateArgs>(args: SelectSubset<T, NanoHistoryUpdateArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NanoHistories.
     * @param {NanoHistoryDeleteManyArgs} args - Arguments to filter NanoHistories to delete.
     * @example
     * // Delete a few NanoHistories
     * const { count } = await prisma.nanoHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NanoHistoryDeleteManyArgs>(args?: SelectSubset<T, NanoHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NanoHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NanoHistories
     * const nanoHistory = await prisma.nanoHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NanoHistoryUpdateManyArgs>(args: SelectSubset<T, NanoHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NanoHistories and returns the data updated in the database.
     * @param {NanoHistoryUpdateManyAndReturnArgs} args - Arguments to update many NanoHistories.
     * @example
     * // Update many NanoHistories
     * const nanoHistory = await prisma.nanoHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NanoHistories and only return the `id`
     * const nanoHistoryWithIdOnly = await prisma.nanoHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NanoHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, NanoHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NanoHistory.
     * @param {NanoHistoryUpsertArgs} args - Arguments to update or create a NanoHistory.
     * @example
     * // Update or create a NanoHistory
     * const nanoHistory = await prisma.nanoHistory.upsert({
     *   create: {
     *     // ... data to create a NanoHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NanoHistory we want to update
     *   }
     * })
     */
    upsert<T extends NanoHistoryUpsertArgs>(args: SelectSubset<T, NanoHistoryUpsertArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NanoHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryCountArgs} args - Arguments to filter NanoHistories to count.
     * @example
     * // Count the number of NanoHistories
     * const count = await prisma.nanoHistory.count({
     *   where: {
     *     // ... the filter for the NanoHistories we want to count
     *   }
     * })
    **/
    count<T extends NanoHistoryCountArgs>(
      args?: Subset<T, NanoHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NanoHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NanoHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NanoHistoryAggregateArgs>(args: Subset<T, NanoHistoryAggregateArgs>): Prisma.PrismaPromise<GetNanoHistoryAggregateType<T>>

    /**
     * Group by NanoHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NanoHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NanoHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NanoHistoryGroupByArgs['orderBy'] }
        : { orderBy?: NanoHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NanoHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNanoHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NanoHistory model
   */
  readonly fields: NanoHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NanoHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NanoHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nano<T extends NanoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NanoDefaultArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvalRequest<T extends NanoHistory$approvalRequestArgs<ExtArgs> = {}>(args?: Subset<T, NanoHistory$approvalRequestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    writer<T extends NanoHistory$writerArgs<ExtArgs> = {}>(args?: Subset<T, NanoHistory$writerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NanoHistory model
   */
  interface NanoHistoryFieldRefs {
    readonly id: FieldRef<"NanoHistory", 'String'>
    readonly nanoId: FieldRef<"NanoHistory", 'String'>
    readonly version: FieldRef<"NanoHistory", 'String'>
    readonly title: FieldRef<"NanoHistory", 'String'>
    readonly content: FieldRef<"NanoHistory", 'Json'>
    readonly writerId: FieldRef<"NanoHistory", 'String'>
    readonly workspaceId: FieldRef<"NanoHistory", 'String'>
    readonly createdAt: FieldRef<"NanoHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"NanoHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NanoHistory findUnique
   */
  export type NanoHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter, which NanoHistory to fetch.
     */
    where: NanoHistoryWhereUniqueInput
  }

  /**
   * NanoHistory findUniqueOrThrow
   */
  export type NanoHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter, which NanoHistory to fetch.
     */
    where: NanoHistoryWhereUniqueInput
  }

  /**
   * NanoHistory findFirst
   */
  export type NanoHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter, which NanoHistory to fetch.
     */
    where?: NanoHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NanoHistories to fetch.
     */
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NanoHistories.
     */
    cursor?: NanoHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NanoHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NanoHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NanoHistories.
     */
    distinct?: NanoHistoryScalarFieldEnum | NanoHistoryScalarFieldEnum[]
  }

  /**
   * NanoHistory findFirstOrThrow
   */
  export type NanoHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter, which NanoHistory to fetch.
     */
    where?: NanoHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NanoHistories to fetch.
     */
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NanoHistories.
     */
    cursor?: NanoHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NanoHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NanoHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NanoHistories.
     */
    distinct?: NanoHistoryScalarFieldEnum | NanoHistoryScalarFieldEnum[]
  }

  /**
   * NanoHistory findMany
   */
  export type NanoHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter, which NanoHistories to fetch.
     */
    where?: NanoHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NanoHistories to fetch.
     */
    orderBy?: NanoHistoryOrderByWithRelationInput | NanoHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NanoHistories.
     */
    cursor?: NanoHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NanoHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NanoHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NanoHistories.
     */
    distinct?: NanoHistoryScalarFieldEnum | NanoHistoryScalarFieldEnum[]
  }

  /**
   * NanoHistory create
   */
  export type NanoHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a NanoHistory.
     */
    data: XOR<NanoHistoryCreateInput, NanoHistoryUncheckedCreateInput>
  }

  /**
   * NanoHistory createMany
   */
  export type NanoHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NanoHistories.
     */
    data: NanoHistoryCreateManyInput | NanoHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NanoHistory createManyAndReturn
   */
  export type NanoHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many NanoHistories.
     */
    data: NanoHistoryCreateManyInput | NanoHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NanoHistory update
   */
  export type NanoHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a NanoHistory.
     */
    data: XOR<NanoHistoryUpdateInput, NanoHistoryUncheckedUpdateInput>
    /**
     * Choose, which NanoHistory to update.
     */
    where: NanoHistoryWhereUniqueInput
  }

  /**
   * NanoHistory updateMany
   */
  export type NanoHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NanoHistories.
     */
    data: XOR<NanoHistoryUpdateManyMutationInput, NanoHistoryUncheckedUpdateManyInput>
    /**
     * Filter which NanoHistories to update
     */
    where?: NanoHistoryWhereInput
    /**
     * Limit how many NanoHistories to update.
     */
    limit?: number
  }

  /**
   * NanoHistory updateManyAndReturn
   */
  export type NanoHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * The data used to update NanoHistories.
     */
    data: XOR<NanoHistoryUpdateManyMutationInput, NanoHistoryUncheckedUpdateManyInput>
    /**
     * Filter which NanoHistories to update
     */
    where?: NanoHistoryWhereInput
    /**
     * Limit how many NanoHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NanoHistory upsert
   */
  export type NanoHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the NanoHistory to update in case it exists.
     */
    where: NanoHistoryWhereUniqueInput
    /**
     * In case the NanoHistory found by the `where` argument doesn't exist, create a new NanoHistory with this data.
     */
    create: XOR<NanoHistoryCreateInput, NanoHistoryUncheckedCreateInput>
    /**
     * In case the NanoHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NanoHistoryUpdateInput, NanoHistoryUncheckedUpdateInput>
  }

  /**
   * NanoHistory delete
   */
  export type NanoHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
    /**
     * Filter which NanoHistory to delete.
     */
    where: NanoHistoryWhereUniqueInput
  }

  /**
   * NanoHistory deleteMany
   */
  export type NanoHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NanoHistories to delete
     */
    where?: NanoHistoryWhereInput
    /**
     * Limit how many NanoHistories to delete.
     */
    limit?: number
  }

  /**
   * NanoHistory.approvalRequest
   */
  export type NanoHistory$approvalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    where?: ApprovalRequestWhereInput
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    cursor?: ApprovalRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * NanoHistory.writer
   */
  export type NanoHistory$writerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * NanoHistory without action
   */
  export type NanoHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NanoHistory
     */
    select?: NanoHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the NanoHistory
     */
    omit?: NanoHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ApprovalRequest
   */

  export type AggregateApprovalRequest = {
    _count: ApprovalRequestCountAggregateOutputType | null
    _avg: ApprovalRequestAvgAggregateOutputType | null
    _sum: ApprovalRequestSumAggregateOutputType | null
    _min: ApprovalRequestMinAggregateOutputType | null
    _max: ApprovalRequestMaxAggregateOutputType | null
  }

  export type ApprovalRequestAvgAggregateOutputType = {
    targetVersion: number | null
  }

  export type ApprovalRequestSumAggregateOutputType = {
    targetVersion: number | null
  }

  export type ApprovalRequestMinAggregateOutputType = {
    id: string | null
    nanoId: string | null
    historyId: string | null
    status: string | null
    targetVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApprovalRequestMaxAggregateOutputType = {
    id: string | null
    nanoId: string | null
    historyId: string | null
    status: string | null
    targetVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApprovalRequestCountAggregateOutputType = {
    id: number
    nanoId: number
    historyId: number
    status: number
    targetVersion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApprovalRequestAvgAggregateInputType = {
    targetVersion?: true
  }

  export type ApprovalRequestSumAggregateInputType = {
    targetVersion?: true
  }

  export type ApprovalRequestMinAggregateInputType = {
    id?: true
    nanoId?: true
    historyId?: true
    status?: true
    targetVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApprovalRequestMaxAggregateInputType = {
    id?: true
    nanoId?: true
    historyId?: true
    status?: true
    targetVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApprovalRequestCountAggregateInputType = {
    id?: true
    nanoId?: true
    historyId?: true
    status?: true
    targetVersion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApprovalRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRequest to aggregate.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalRequests
    **/
    _count?: true | ApprovalRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApprovalRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApprovalRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalRequestMaxAggregateInputType
  }

  export type GetApprovalRequestAggregateType<T extends ApprovalRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalRequest[P]>
      : GetScalarType<T[P], AggregateApprovalRequest[P]>
  }




  export type ApprovalRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalRequestWhereInput
    orderBy?: ApprovalRequestOrderByWithAggregationInput | ApprovalRequestOrderByWithAggregationInput[]
    by: ApprovalRequestScalarFieldEnum[] | ApprovalRequestScalarFieldEnum
    having?: ApprovalRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalRequestCountAggregateInputType | true
    _avg?: ApprovalRequestAvgAggregateInputType
    _sum?: ApprovalRequestSumAggregateInputType
    _min?: ApprovalRequestMinAggregateInputType
    _max?: ApprovalRequestMaxAggregateInputType
  }

  export type ApprovalRequestGroupByOutputType = {
    id: string
    nanoId: string
    historyId: string
    status: string | null
    targetVersion: number
    createdAt: Date
    updatedAt: Date
    _count: ApprovalRequestCountAggregateOutputType | null
    _avg: ApprovalRequestAvgAggregateOutputType | null
    _sum: ApprovalRequestSumAggregateOutputType | null
    _min: ApprovalRequestMinAggregateOutputType | null
    _max: ApprovalRequestMaxAggregateOutputType | null
  }

  type GetApprovalRequestGroupByPayload<T extends ApprovalRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalRequestGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    historyId?: boolean
    status?: boolean
    targetVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
    pendingNano?: boolean | ApprovalRequest$pendingNanoArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    historyId?: boolean
    status?: boolean
    targetVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nanoId?: boolean
    historyId?: boolean
    status?: boolean
    targetVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approvalRequest"]>

  export type ApprovalRequestSelectScalar = {
    id?: boolean
    nanoId?: boolean
    historyId?: boolean
    status?: boolean
    targetVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApprovalRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nanoId" | "historyId" | "status" | "targetVersion" | "createdAt" | "updatedAt", ExtArgs["result"]["approvalRequest"]>
  export type ApprovalRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
    pendingNano?: boolean | ApprovalRequest$pendingNanoArgs<ExtArgs>
  }
  export type ApprovalRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
  }
  export type ApprovalRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | NanoHistoryDefaultArgs<ExtArgs>
  }

  export type $ApprovalRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalRequest"
    objects: {
      history: Prisma.$NanoHistoryPayload<ExtArgs>
      pendingNano: Prisma.$PendingNanoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nanoId: string
      historyId: string
      status: string | null
      targetVersion: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["approvalRequest"]>
    composites: {}
  }

  type ApprovalRequestGetPayload<S extends boolean | null | undefined | ApprovalRequestDefaultArgs> = $Result.GetResult<Prisma.$ApprovalRequestPayload, S>

  type ApprovalRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalRequestCountAggregateInputType | true
    }

  export interface ApprovalRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalRequest'], meta: { name: 'ApprovalRequest' } }
    /**
     * Find zero or one ApprovalRequest that matches the filter.
     * @param {ApprovalRequestFindUniqueArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalRequestFindUniqueArgs>(args: SelectSubset<T, ApprovalRequestFindUniqueArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalRequestFindUniqueOrThrowArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindFirstArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalRequestFindFirstArgs>(args?: SelectSubset<T, ApprovalRequestFindFirstArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindFirstOrThrowArgs} args - Arguments to find a ApprovalRequest
     * @example
     * // Get one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalRequests
     * const approvalRequests = await prisma.approvalRequest.findMany()
     * 
     * // Get first 10 ApprovalRequests
     * const approvalRequests = await prisma.approvalRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalRequestFindManyArgs>(args?: SelectSubset<T, ApprovalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalRequest.
     * @param {ApprovalRequestCreateArgs} args - Arguments to create a ApprovalRequest.
     * @example
     * // Create one ApprovalRequest
     * const ApprovalRequest = await prisma.approvalRequest.create({
     *   data: {
     *     // ... data to create a ApprovalRequest
     *   }
     * })
     * 
     */
    create<T extends ApprovalRequestCreateArgs>(args: SelectSubset<T, ApprovalRequestCreateArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalRequests.
     * @param {ApprovalRequestCreateManyArgs} args - Arguments to create many ApprovalRequests.
     * @example
     * // Create many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalRequestCreateManyArgs>(args?: SelectSubset<T, ApprovalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalRequests and returns the data saved in the database.
     * @param {ApprovalRequestCreateManyAndReturnArgs} args - Arguments to create many ApprovalRequests.
     * @example
     * // Create many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalRequests and only return the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalRequest.
     * @param {ApprovalRequestDeleteArgs} args - Arguments to delete one ApprovalRequest.
     * @example
     * // Delete one ApprovalRequest
     * const ApprovalRequest = await prisma.approvalRequest.delete({
     *   where: {
     *     // ... filter to delete one ApprovalRequest
     *   }
     * })
     * 
     */
    delete<T extends ApprovalRequestDeleteArgs>(args: SelectSubset<T, ApprovalRequestDeleteArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalRequest.
     * @param {ApprovalRequestUpdateArgs} args - Arguments to update one ApprovalRequest.
     * @example
     * // Update one ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalRequestUpdateArgs>(args: SelectSubset<T, ApprovalRequestUpdateArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalRequests.
     * @param {ApprovalRequestDeleteManyArgs} args - Arguments to filter ApprovalRequests to delete.
     * @example
     * // Delete a few ApprovalRequests
     * const { count } = await prisma.approvalRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalRequestDeleteManyArgs>(args?: SelectSubset<T, ApprovalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalRequestUpdateManyArgs>(args: SelectSubset<T, ApprovalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalRequests and returns the data updated in the database.
     * @param {ApprovalRequestUpdateManyAndReturnArgs} args - Arguments to update many ApprovalRequests.
     * @example
     * // Update many ApprovalRequests
     * const approvalRequest = await prisma.approvalRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalRequests and only return the `id`
     * const approvalRequestWithIdOnly = await prisma.approvalRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApprovalRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalRequest.
     * @param {ApprovalRequestUpsertArgs} args - Arguments to update or create a ApprovalRequest.
     * @example
     * // Update or create a ApprovalRequest
     * const approvalRequest = await prisma.approvalRequest.upsert({
     *   create: {
     *     // ... data to create a ApprovalRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalRequest we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalRequestUpsertArgs>(args: SelectSubset<T, ApprovalRequestUpsertArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestCountArgs} args - Arguments to filter ApprovalRequests to count.
     * @example
     * // Count the number of ApprovalRequests
     * const count = await prisma.approvalRequest.count({
     *   where: {
     *     // ... the filter for the ApprovalRequests we want to count
     *   }
     * })
    **/
    count<T extends ApprovalRequestCountArgs>(
      args?: Subset<T, ApprovalRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApprovalRequestAggregateArgs>(args: Subset<T, ApprovalRequestAggregateArgs>): Prisma.PrismaPromise<GetApprovalRequestAggregateType<T>>

    /**
     * Group by ApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApprovalRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalRequestGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApprovalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalRequest model
   */
  readonly fields: ApprovalRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends NanoHistoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NanoHistoryDefaultArgs<ExtArgs>>): Prisma__NanoHistoryClient<$Result.GetResult<Prisma.$NanoHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pendingNano<T extends ApprovalRequest$pendingNanoArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRequest$pendingNanoArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApprovalRequest model
   */
  interface ApprovalRequestFieldRefs {
    readonly id: FieldRef<"ApprovalRequest", 'String'>
    readonly nanoId: FieldRef<"ApprovalRequest", 'String'>
    readonly historyId: FieldRef<"ApprovalRequest", 'String'>
    readonly status: FieldRef<"ApprovalRequest", 'String'>
    readonly targetVersion: FieldRef<"ApprovalRequest", 'Int'>
    readonly createdAt: FieldRef<"ApprovalRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ApprovalRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalRequest findUnique
   */
  export type ApprovalRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest findUniqueOrThrow
   */
  export type ApprovalRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest findFirst
   */
  export type ApprovalRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRequests.
     */
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest findFirstOrThrow
   */
  export type ApprovalRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequest to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRequests.
     */
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest findMany
   */
  export type ApprovalRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which ApprovalRequests to fetch.
     */
    where?: ApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalRequests to fetch.
     */
    orderBy?: ApprovalRequestOrderByWithRelationInput | ApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalRequests.
     */
    cursor?: ApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalRequests.
     */
    distinct?: ApprovalRequestScalarFieldEnum | ApprovalRequestScalarFieldEnum[]
  }

  /**
   * ApprovalRequest create
   */
  export type ApprovalRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ApprovalRequest.
     */
    data: XOR<ApprovalRequestCreateInput, ApprovalRequestUncheckedCreateInput>
  }

  /**
   * ApprovalRequest createMany
   */
  export type ApprovalRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalRequests.
     */
    data: ApprovalRequestCreateManyInput | ApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalRequest createManyAndReturn
   */
  export type ApprovalRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalRequests.
     */
    data: ApprovalRequestCreateManyInput | ApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRequest update
   */
  export type ApprovalRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ApprovalRequest.
     */
    data: XOR<ApprovalRequestUpdateInput, ApprovalRequestUncheckedUpdateInput>
    /**
     * Choose, which ApprovalRequest to update.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest updateMany
   */
  export type ApprovalRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalRequests.
     */
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRequests to update
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to update.
     */
    limit?: number
  }

  /**
   * ApprovalRequest updateManyAndReturn
   */
  export type ApprovalRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalRequests.
     */
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalRequests to update
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApprovalRequest upsert
   */
  export type ApprovalRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ApprovalRequest to update in case it exists.
     */
    where: ApprovalRequestWhereUniqueInput
    /**
     * In case the ApprovalRequest found by the `where` argument doesn't exist, create a new ApprovalRequest with this data.
     */
    create: XOR<ApprovalRequestCreateInput, ApprovalRequestUncheckedCreateInput>
    /**
     * In case the ApprovalRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalRequestUpdateInput, ApprovalRequestUncheckedUpdateInput>
  }

  /**
   * ApprovalRequest delete
   */
  export type ApprovalRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter which ApprovalRequest to delete.
     */
    where: ApprovalRequestWhereUniqueInput
  }

  /**
   * ApprovalRequest deleteMany
   */
  export type ApprovalRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalRequests to delete
     */
    where?: ApprovalRequestWhereInput
    /**
     * Limit how many ApprovalRequests to delete.
     */
    limit?: number
  }

  /**
   * ApprovalRequest.pendingNano
   */
  export type ApprovalRequest$pendingNanoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    where?: PendingNanoWhereInput
  }

  /**
   * ApprovalRequest without action
   */
  export type ApprovalRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalRequest
     */
    select?: ApprovalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalRequest
     */
    omit?: ApprovalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApprovalRequestInclude<ExtArgs> | null
  }


  /**
   * Model PendingNano
   */

  export type AggregatePendingNano = {
    _count: PendingNanoCountAggregateOutputType | null
    _min: PendingNanoMinAggregateOutputType | null
    _max: PendingNanoMaxAggregateOutputType | null
  }

  export type PendingNanoMinAggregateOutputType = {
    approvalId: string | null
    nanoId: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type PendingNanoMaxAggregateOutputType = {
    approvalId: string | null
    nanoId: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type PendingNanoCountAggregateOutputType = {
    approvalId: number
    nanoId: number
    comment: number
    createdAt: number
    _all: number
  }


  export type PendingNanoMinAggregateInputType = {
    approvalId?: true
    nanoId?: true
    comment?: true
    createdAt?: true
  }

  export type PendingNanoMaxAggregateInputType = {
    approvalId?: true
    nanoId?: true
    comment?: true
    createdAt?: true
  }

  export type PendingNanoCountAggregateInputType = {
    approvalId?: true
    nanoId?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type PendingNanoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingNano to aggregate.
     */
    where?: PendingNanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNanos to fetch.
     */
    orderBy?: PendingNanoOrderByWithRelationInput | PendingNanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingNanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingNanos
    **/
    _count?: true | PendingNanoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingNanoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingNanoMaxAggregateInputType
  }

  export type GetPendingNanoAggregateType<T extends PendingNanoAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingNano]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingNano[P]>
      : GetScalarType<T[P], AggregatePendingNano[P]>
  }




  export type PendingNanoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingNanoWhereInput
    orderBy?: PendingNanoOrderByWithAggregationInput | PendingNanoOrderByWithAggregationInput[]
    by: PendingNanoScalarFieldEnum[] | PendingNanoScalarFieldEnum
    having?: PendingNanoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingNanoCountAggregateInputType | true
    _min?: PendingNanoMinAggregateInputType
    _max?: PendingNanoMaxAggregateInputType
  }

  export type PendingNanoGroupByOutputType = {
    approvalId: string
    nanoId: string | null
    comment: string | null
    createdAt: Date
    _count: PendingNanoCountAggregateOutputType | null
    _min: PendingNanoMinAggregateOutputType | null
    _max: PendingNanoMaxAggregateOutputType | null
  }

  type GetPendingNanoGroupByPayload<T extends PendingNanoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingNanoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingNanoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingNanoGroupByOutputType[P]>
            : GetScalarType<T[P], PendingNanoGroupByOutputType[P]>
        }
      >
    >


  export type PendingNanoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    approvalId?: boolean
    nanoId?: boolean
    comment?: boolean
    createdAt?: boolean
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }, ExtArgs["result"]["pendingNano"]>

  export type PendingNanoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    approvalId?: boolean
    nanoId?: boolean
    comment?: boolean
    createdAt?: boolean
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }, ExtArgs["result"]["pendingNano"]>

  export type PendingNanoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    approvalId?: boolean
    nanoId?: boolean
    comment?: boolean
    createdAt?: boolean
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }, ExtArgs["result"]["pendingNano"]>

  export type PendingNanoSelectScalar = {
    approvalId?: boolean
    nanoId?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type PendingNanoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"approvalId" | "nanoId" | "comment" | "createdAt", ExtArgs["result"]["pendingNano"]>
  export type PendingNanoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }
  export type PendingNanoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }
  export type PendingNanoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approval?: boolean | ApprovalRequestDefaultArgs<ExtArgs>
    nano?: boolean | PendingNano$nanoArgs<ExtArgs>
  }

  export type $PendingNanoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingNano"
    objects: {
      approval: Prisma.$ApprovalRequestPayload<ExtArgs>
      nano: Prisma.$NanoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      approvalId: string
      nanoId: string | null
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["pendingNano"]>
    composites: {}
  }

  type PendingNanoGetPayload<S extends boolean | null | undefined | PendingNanoDefaultArgs> = $Result.GetResult<Prisma.$PendingNanoPayload, S>

  type PendingNanoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendingNanoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendingNanoCountAggregateInputType | true
    }

  export interface PendingNanoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingNano'], meta: { name: 'PendingNano' } }
    /**
     * Find zero or one PendingNano that matches the filter.
     * @param {PendingNanoFindUniqueArgs} args - Arguments to find a PendingNano
     * @example
     * // Get one PendingNano
     * const pendingNano = await prisma.pendingNano.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingNanoFindUniqueArgs>(args: SelectSubset<T, PendingNanoFindUniqueArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PendingNano that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingNanoFindUniqueOrThrowArgs} args - Arguments to find a PendingNano
     * @example
     * // Get one PendingNano
     * const pendingNano = await prisma.pendingNano.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingNanoFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingNanoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingNano that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoFindFirstArgs} args - Arguments to find a PendingNano
     * @example
     * // Get one PendingNano
     * const pendingNano = await prisma.pendingNano.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingNanoFindFirstArgs>(args?: SelectSubset<T, PendingNanoFindFirstArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingNano that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoFindFirstOrThrowArgs} args - Arguments to find a PendingNano
     * @example
     * // Get one PendingNano
     * const pendingNano = await prisma.pendingNano.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingNanoFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingNanoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PendingNanos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingNanos
     * const pendingNanos = await prisma.pendingNano.findMany()
     * 
     * // Get first 10 PendingNanos
     * const pendingNanos = await prisma.pendingNano.findMany({ take: 10 })
     * 
     * // Only select the `approvalId`
     * const pendingNanoWithApprovalIdOnly = await prisma.pendingNano.findMany({ select: { approvalId: true } })
     * 
     */
    findMany<T extends PendingNanoFindManyArgs>(args?: SelectSubset<T, PendingNanoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PendingNano.
     * @param {PendingNanoCreateArgs} args - Arguments to create a PendingNano.
     * @example
     * // Create one PendingNano
     * const PendingNano = await prisma.pendingNano.create({
     *   data: {
     *     // ... data to create a PendingNano
     *   }
     * })
     * 
     */
    create<T extends PendingNanoCreateArgs>(args: SelectSubset<T, PendingNanoCreateArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PendingNanos.
     * @param {PendingNanoCreateManyArgs} args - Arguments to create many PendingNanos.
     * @example
     * // Create many PendingNanos
     * const pendingNano = await prisma.pendingNano.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingNanoCreateManyArgs>(args?: SelectSubset<T, PendingNanoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingNanos and returns the data saved in the database.
     * @param {PendingNanoCreateManyAndReturnArgs} args - Arguments to create many PendingNanos.
     * @example
     * // Create many PendingNanos
     * const pendingNano = await prisma.pendingNano.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingNanos and only return the `approvalId`
     * const pendingNanoWithApprovalIdOnly = await prisma.pendingNano.createManyAndReturn({
     *   select: { approvalId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingNanoCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingNanoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PendingNano.
     * @param {PendingNanoDeleteArgs} args - Arguments to delete one PendingNano.
     * @example
     * // Delete one PendingNano
     * const PendingNano = await prisma.pendingNano.delete({
     *   where: {
     *     // ... filter to delete one PendingNano
     *   }
     * })
     * 
     */
    delete<T extends PendingNanoDeleteArgs>(args: SelectSubset<T, PendingNanoDeleteArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PendingNano.
     * @param {PendingNanoUpdateArgs} args - Arguments to update one PendingNano.
     * @example
     * // Update one PendingNano
     * const pendingNano = await prisma.pendingNano.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingNanoUpdateArgs>(args: SelectSubset<T, PendingNanoUpdateArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PendingNanos.
     * @param {PendingNanoDeleteManyArgs} args - Arguments to filter PendingNanos to delete.
     * @example
     * // Delete a few PendingNanos
     * const { count } = await prisma.pendingNano.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingNanoDeleteManyArgs>(args?: SelectSubset<T, PendingNanoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingNanos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingNanos
     * const pendingNano = await prisma.pendingNano.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingNanoUpdateManyArgs>(args: SelectSubset<T, PendingNanoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingNanos and returns the data updated in the database.
     * @param {PendingNanoUpdateManyAndReturnArgs} args - Arguments to update many PendingNanos.
     * @example
     * // Update many PendingNanos
     * const pendingNano = await prisma.pendingNano.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PendingNanos and only return the `approvalId`
     * const pendingNanoWithApprovalIdOnly = await prisma.pendingNano.updateManyAndReturn({
     *   select: { approvalId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendingNanoUpdateManyAndReturnArgs>(args: SelectSubset<T, PendingNanoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PendingNano.
     * @param {PendingNanoUpsertArgs} args - Arguments to update or create a PendingNano.
     * @example
     * // Update or create a PendingNano
     * const pendingNano = await prisma.pendingNano.upsert({
     *   create: {
     *     // ... data to create a PendingNano
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingNano we want to update
     *   }
     * })
     */
    upsert<T extends PendingNanoUpsertArgs>(args: SelectSubset<T, PendingNanoUpsertArgs<ExtArgs>>): Prisma__PendingNanoClient<$Result.GetResult<Prisma.$PendingNanoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PendingNanos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoCountArgs} args - Arguments to filter PendingNanos to count.
     * @example
     * // Count the number of PendingNanos
     * const count = await prisma.pendingNano.count({
     *   where: {
     *     // ... the filter for the PendingNanos we want to count
     *   }
     * })
    **/
    count<T extends PendingNanoCountArgs>(
      args?: Subset<T, PendingNanoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingNanoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingNano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendingNanoAggregateArgs>(args: Subset<T, PendingNanoAggregateArgs>): Prisma.PrismaPromise<GetPendingNanoAggregateType<T>>

    /**
     * Group by PendingNano.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNanoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendingNanoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingNanoGroupByArgs['orderBy'] }
        : { orderBy?: PendingNanoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendingNanoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingNanoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingNano model
   */
  readonly fields: PendingNanoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingNano.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingNanoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    approval<T extends ApprovalRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApprovalRequestDefaultArgs<ExtArgs>>): Prisma__ApprovalRequestClient<$Result.GetResult<Prisma.$ApprovalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    nano<T extends PendingNano$nanoArgs<ExtArgs> = {}>(args?: Subset<T, PendingNano$nanoArgs<ExtArgs>>): Prisma__NanoClient<$Result.GetResult<Prisma.$NanoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PendingNano model
   */
  interface PendingNanoFieldRefs {
    readonly approvalId: FieldRef<"PendingNano", 'String'>
    readonly nanoId: FieldRef<"PendingNano", 'String'>
    readonly comment: FieldRef<"PendingNano", 'String'>
    readonly createdAt: FieldRef<"PendingNano", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PendingNano findUnique
   */
  export type PendingNanoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter, which PendingNano to fetch.
     */
    where: PendingNanoWhereUniqueInput
  }

  /**
   * PendingNano findUniqueOrThrow
   */
  export type PendingNanoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter, which PendingNano to fetch.
     */
    where: PendingNanoWhereUniqueInput
  }

  /**
   * PendingNano findFirst
   */
  export type PendingNanoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter, which PendingNano to fetch.
     */
    where?: PendingNanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNanos to fetch.
     */
    orderBy?: PendingNanoOrderByWithRelationInput | PendingNanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingNanos.
     */
    cursor?: PendingNanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingNanos.
     */
    distinct?: PendingNanoScalarFieldEnum | PendingNanoScalarFieldEnum[]
  }

  /**
   * PendingNano findFirstOrThrow
   */
  export type PendingNanoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter, which PendingNano to fetch.
     */
    where?: PendingNanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNanos to fetch.
     */
    orderBy?: PendingNanoOrderByWithRelationInput | PendingNanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingNanos.
     */
    cursor?: PendingNanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingNanos.
     */
    distinct?: PendingNanoScalarFieldEnum | PendingNanoScalarFieldEnum[]
  }

  /**
   * PendingNano findMany
   */
  export type PendingNanoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter, which PendingNanos to fetch.
     */
    where?: PendingNanoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNanos to fetch.
     */
    orderBy?: PendingNanoOrderByWithRelationInput | PendingNanoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingNanos.
     */
    cursor?: PendingNanoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNanos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNanos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingNanos.
     */
    distinct?: PendingNanoScalarFieldEnum | PendingNanoScalarFieldEnum[]
  }

  /**
   * PendingNano create
   */
  export type PendingNanoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * The data needed to create a PendingNano.
     */
    data: XOR<PendingNanoCreateInput, PendingNanoUncheckedCreateInput>
  }

  /**
   * PendingNano createMany
   */
  export type PendingNanoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingNanos.
     */
    data: PendingNanoCreateManyInput | PendingNanoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingNano createManyAndReturn
   */
  export type PendingNanoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * The data used to create many PendingNanos.
     */
    data: PendingNanoCreateManyInput | PendingNanoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PendingNano update
   */
  export type PendingNanoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * The data needed to update a PendingNano.
     */
    data: XOR<PendingNanoUpdateInput, PendingNanoUncheckedUpdateInput>
    /**
     * Choose, which PendingNano to update.
     */
    where: PendingNanoWhereUniqueInput
  }

  /**
   * PendingNano updateMany
   */
  export type PendingNanoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingNanos.
     */
    data: XOR<PendingNanoUpdateManyMutationInput, PendingNanoUncheckedUpdateManyInput>
    /**
     * Filter which PendingNanos to update
     */
    where?: PendingNanoWhereInput
    /**
     * Limit how many PendingNanos to update.
     */
    limit?: number
  }

  /**
   * PendingNano updateManyAndReturn
   */
  export type PendingNanoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * The data used to update PendingNanos.
     */
    data: XOR<PendingNanoUpdateManyMutationInput, PendingNanoUncheckedUpdateManyInput>
    /**
     * Filter which PendingNanos to update
     */
    where?: PendingNanoWhereInput
    /**
     * Limit how many PendingNanos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PendingNano upsert
   */
  export type PendingNanoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * The filter to search for the PendingNano to update in case it exists.
     */
    where: PendingNanoWhereUniqueInput
    /**
     * In case the PendingNano found by the `where` argument doesn't exist, create a new PendingNano with this data.
     */
    create: XOR<PendingNanoCreateInput, PendingNanoUncheckedCreateInput>
    /**
     * In case the PendingNano was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingNanoUpdateInput, PendingNanoUncheckedUpdateInput>
  }

  /**
   * PendingNano delete
   */
  export type PendingNanoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
    /**
     * Filter which PendingNano to delete.
     */
    where: PendingNanoWhereUniqueInput
  }

  /**
   * PendingNano deleteMany
   */
  export type PendingNanoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingNanos to delete
     */
    where?: PendingNanoWhereInput
    /**
     * Limit how many PendingNanos to delete.
     */
    limit?: number
  }

  /**
   * PendingNano.nano
   */
  export type PendingNano$nanoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nano
     */
    select?: NanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nano
     */
    omit?: NanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NanoInclude<ExtArgs> | null
    where?: NanoWhereInput
  }

  /**
   * PendingNano without action
   */
  export type PendingNanoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNano
     */
    select?: PendingNanoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNano
     */
    omit?: PendingNanoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingNanoInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    hashedToken: string | null
    jti: string | null
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    hashedToken: string | null
    jti: string | null
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    userId: number
    hashedToken: number
    jti: number
    userAgent: number
    ipAddress: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    userId?: true
    hashedToken?: true
    jti?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    hashedToken?: true
    jti?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    userId?: true
    hashedToken?: true
    jti?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    userId: string
    hashedToken: string
    jti: string
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hashedToken?: boolean
    jti?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hashedToken?: boolean
    jti?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hashedToken?: boolean
    jti?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    hashedToken?: boolean
    jti?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "hashedToken" | "jti" | "userAgent" | "ipAddress" | "expiresAt" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      hashedToken: string
      jti: string
      userAgent: string | null
      ipAddress: string | null
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly hashedToken: FieldRef<"RefreshToken", 'String'>
    readonly jti: FieldRef<"RefreshToken", 'String'>
    readonly userAgent: FieldRef<"RefreshToken", 'String'>
    readonly ipAddress: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    provider: 'provider',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserPreferenceScalarFieldEnum: {
    userId: 'userId',
    language: 'language',
    theme: 'theme',
    timezone: 'timezone'
  };

  export type UserPreferenceScalarFieldEnum = (typeof UserPreferenceScalarFieldEnum)[keyof typeof UserPreferenceScalarFieldEnum]


  export const WorkspaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logoUrl: 'logoUrl',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const WorkspaceInvitationScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    inviterId: 'inviterId',
    targetEmail: 'targetEmail',
    invitation: 'invitation',
    token: 'token',
    status: 'status',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type WorkspaceInvitationScalarFieldEnum = (typeof WorkspaceInvitationScalarFieldEnum)[keyof typeof WorkspaceInvitationScalarFieldEnum]


  export const WorkspaceMemberScalarFieldEnum: {
    workspaceId: 'workspaceId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type WorkspaceMemberScalarFieldEnum = (typeof WorkspaceMemberScalarFieldEnum)[keyof typeof WorkspaceMemberScalarFieldEnum]


  export const ChatroomScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    title: 'title',
    description: 'description',
    isPrivate: 'isPrivate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatroomScalarFieldEnum = (typeof ChatroomScalarFieldEnum)[keyof typeof ChatroomScalarFieldEnum]


  export const ChatroomMemberScalarFieldEnum: {
    chatroomId: 'chatroomId',
    userId: 'userId',
    workspaceId: 'workspaceId',
    role: 'role',
    lastReadMessageId: 'lastReadMessageId',
    lastReadAt: 'lastReadAt',
    joinedAt: 'joinedAt'
  };

  export type ChatroomMemberScalarFieldEnum = (typeof ChatroomMemberScalarFieldEnum)[keyof typeof ChatroomMemberScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    chatroomId: 'chatroomId',
    senderId: 'senderId',
    content: 'content',
    type: 'type',
    isEdited: 'isEdited',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const NanoScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    parentNanoId: 'parentNanoId',
    type: 'type',
    title: 'title',
    content: 'content',
    writerId: 'writerId',
    position: 'position',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    parentDeletedAt: 'parentDeletedAt'
  };

  export type NanoScalarFieldEnum = (typeof NanoScalarFieldEnum)[keyof typeof NanoScalarFieldEnum]


  export const NanoHistoryScalarFieldEnum: {
    id: 'id',
    nanoId: 'nanoId',
    version: 'version',
    title: 'title',
    content: 'content',
    writerId: 'writerId',
    workspaceId: 'workspaceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NanoHistoryScalarFieldEnum = (typeof NanoHistoryScalarFieldEnum)[keyof typeof NanoHistoryScalarFieldEnum]


  export const ApprovalRequestScalarFieldEnum: {
    id: 'id',
    nanoId: 'nanoId',
    historyId: 'historyId',
    status: 'status',
    targetVersion: 'targetVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApprovalRequestScalarFieldEnum = (typeof ApprovalRequestScalarFieldEnum)[keyof typeof ApprovalRequestScalarFieldEnum]


  export const PendingNanoScalarFieldEnum: {
    approvalId: 'approvalId',
    nanoId: 'nanoId',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type PendingNanoScalarFieldEnum = (typeof PendingNanoScalarFieldEnum)[keyof typeof PendingNanoScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    hashedToken: 'hashedToken',
    jti: 'jti',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    preference?: XOR<UserPreferenceNullableScalarRelationFilter, UserPreferenceWhereInput> | null
    workspaceMembers?: WorkspaceMemberListRelationFilter
    WorkspaceInvitations?: WorkspaceInvitationListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    nanoHistorys?: NanoHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    preference?: UserPreferenceOrderByWithRelationInput
    workspaceMembers?: WorkspaceMemberOrderByRelationAggregateInput
    WorkspaceInvitations?: WorkspaceInvitationOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    nanoHistorys?: NanoHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    preference?: XOR<UserPreferenceNullableScalarRelationFilter, UserPreferenceWhereInput> | null
    workspaceMembers?: WorkspaceMemberListRelationFilter
    WorkspaceInvitations?: WorkspaceInvitationListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    nanoHistorys?: NanoHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type UserPreferenceWhereInput = {
    AND?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    OR?: UserPreferenceWhereInput[]
    NOT?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    userId?: StringFilter<"UserPreference"> | string
    language?: StringNullableFilter<"UserPreference"> | string | null
    theme?: StringNullableFilter<"UserPreference"> | string | null
    timezone?: StringNullableFilter<"UserPreference"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserPreferenceOrderByWithRelationInput = {
    userId?: SortOrder
    language?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserPreferenceWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    OR?: UserPreferenceWhereInput[]
    NOT?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    language?: StringNullableFilter<"UserPreference"> | string | null
    theme?: StringNullableFilter<"UserPreference"> | string | null
    timezone?: StringNullableFilter<"UserPreference"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId">

  export type UserPreferenceOrderByWithAggregationInput = {
    userId?: SortOrder
    language?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    _count?: UserPreferenceCountOrderByAggregateInput
    _max?: UserPreferenceMaxOrderByAggregateInput
    _min?: UserPreferenceMinOrderByAggregateInput
  }

  export type UserPreferenceScalarWhereWithAggregatesInput = {
    AND?: UserPreferenceScalarWhereWithAggregatesInput | UserPreferenceScalarWhereWithAggregatesInput[]
    OR?: UserPreferenceScalarWhereWithAggregatesInput[]
    NOT?: UserPreferenceScalarWhereWithAggregatesInput | UserPreferenceScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserPreference"> | string
    language?: StringNullableWithAggregatesFilter<"UserPreference"> | string | null
    theme?: StringNullableWithAggregatesFilter<"UserPreference"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"UserPreference"> | string | null
  }

  export type WorkspaceWhereInput = {
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    logoUrl?: StringNullableFilter<"Workspace"> | string | null
    description?: StringNullableFilter<"Workspace"> | string | null
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Workspace"> | Date | string | null
    members?: WorkspaceMemberListRelationFilter
    invitations?: WorkspaceInvitationListRelationFilter
    chatrooms?: ChatroomListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    members?: WorkspaceMemberOrderByRelationAggregateInput
    invitations?: WorkspaceInvitationOrderByRelationAggregateInput
    chatrooms?: ChatroomOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    name?: StringFilter<"Workspace"> | string
    logoUrl?: StringNullableFilter<"Workspace"> | string | null
    description?: StringNullableFilter<"Workspace"> | string | null
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Workspace"> | Date | string | null
    members?: WorkspaceMemberListRelationFilter
    invitations?: WorkspaceInvitationListRelationFilter
    chatrooms?: ChatroomListRelationFilter
  }, "id">

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    OR?: WorkspaceScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workspace"> | string
    name?: StringWithAggregatesFilter<"Workspace"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Workspace"> | string | null
    description?: StringNullableWithAggregatesFilter<"Workspace"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Workspace"> | Date | string | null
  }

  export type WorkspaceInvitationWhereInput = {
    AND?: WorkspaceInvitationWhereInput | WorkspaceInvitationWhereInput[]
    OR?: WorkspaceInvitationWhereInput[]
    NOT?: WorkspaceInvitationWhereInput | WorkspaceInvitationWhereInput[]
    id?: StringFilter<"WorkspaceInvitation"> | string
    workspaceId?: StringFilter<"WorkspaceInvitation"> | string
    inviterId?: StringFilter<"WorkspaceInvitation"> | string
    targetEmail?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    invitation?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    token?: StringFilter<"WorkspaceInvitation"> | string
    status?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    createdAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
    expiresAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    inviter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorkspaceInvitationOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    inviterId?: SortOrder
    targetEmail?: SortOrderInput | SortOrder
    invitation?: SortOrderInput | SortOrder
    token?: SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    inviter?: UserOrderByWithRelationInput
  }

  export type WorkspaceInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    workspaceId_targetEmail_status?: WorkspaceInvitationWorkspaceIdTargetEmailStatusCompoundUniqueInput
    AND?: WorkspaceInvitationWhereInput | WorkspaceInvitationWhereInput[]
    OR?: WorkspaceInvitationWhereInput[]
    NOT?: WorkspaceInvitationWhereInput | WorkspaceInvitationWhereInput[]
    workspaceId?: StringFilter<"WorkspaceInvitation"> | string
    inviterId?: StringFilter<"WorkspaceInvitation"> | string
    targetEmail?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    invitation?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    status?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    createdAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
    expiresAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    inviter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token" | "workspaceId_targetEmail_status">

  export type WorkspaceInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    inviterId?: SortOrder
    targetEmail?: SortOrderInput | SortOrder
    invitation?: SortOrderInput | SortOrder
    token?: SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: WorkspaceInvitationCountOrderByAggregateInput
    _max?: WorkspaceInvitationMaxOrderByAggregateInput
    _min?: WorkspaceInvitationMinOrderByAggregateInput
  }

  export type WorkspaceInvitationScalarWhereWithAggregatesInput = {
    AND?: WorkspaceInvitationScalarWhereWithAggregatesInput | WorkspaceInvitationScalarWhereWithAggregatesInput[]
    OR?: WorkspaceInvitationScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceInvitationScalarWhereWithAggregatesInput | WorkspaceInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkspaceInvitation"> | string
    workspaceId?: StringWithAggregatesFilter<"WorkspaceInvitation"> | string
    inviterId?: StringWithAggregatesFilter<"WorkspaceInvitation"> | string
    targetEmail?: StringNullableWithAggregatesFilter<"WorkspaceInvitation"> | string | null
    invitation?: StringNullableWithAggregatesFilter<"WorkspaceInvitation"> | string | null
    token?: StringWithAggregatesFilter<"WorkspaceInvitation"> | string
    status?: StringNullableWithAggregatesFilter<"WorkspaceInvitation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkspaceInvitation"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"WorkspaceInvitation"> | Date | string
  }

  export type WorkspaceMemberWhereInput = {
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: StringNullableFilter<"WorkspaceMember"> | string | null
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chatroomMembers?: ChatroomMemberListRelationFilter
    nanos?: NanoListRelationFilter
  }

  export type WorkspaceMemberOrderByWithRelationInput = {
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    chatroomMembers?: ChatroomMemberOrderByRelationAggregateInput
    nanos?: NanoOrderByRelationAggregateInput
  }

  export type WorkspaceMemberWhereUniqueInput = Prisma.AtLeast<{
    workspaceId_userId?: WorkspaceMemberWorkspaceIdUserIdCompoundUniqueInput
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: StringNullableFilter<"WorkspaceMember"> | string | null
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chatroomMembers?: ChatroomMemberListRelationFilter
    nanos?: NanoListRelationFilter
  }, "workspaceId_userId">

  export type WorkspaceMemberOrderByWithAggregationInput = {
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    _count?: WorkspaceMemberCountOrderByAggregateInput
    _max?: WorkspaceMemberMaxOrderByAggregateInput
    _min?: WorkspaceMemberMinOrderByAggregateInput
  }

  export type WorkspaceMemberScalarWhereWithAggregatesInput = {
    AND?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    OR?: WorkspaceMemberScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    workspaceId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    userId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    role?: StringNullableWithAggregatesFilter<"WorkspaceMember"> | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"WorkspaceMember"> | Date | string
  }

  export type ChatroomWhereInput = {
    AND?: ChatroomWhereInput | ChatroomWhereInput[]
    OR?: ChatroomWhereInput[]
    NOT?: ChatroomWhereInput | ChatroomWhereInput[]
    id?: StringFilter<"Chatroom"> | string
    workspaceId?: StringFilter<"Chatroom"> | string
    title?: StringNullableFilter<"Chatroom"> | string | null
    description?: StringNullableFilter<"Chatroom"> | string | null
    isPrivate?: BoolFilter<"Chatroom"> | boolean
    createdAt?: DateTimeFilter<"Chatroom"> | Date | string
    updatedAt?: DateTimeFilter<"Chatroom"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    members?: ChatroomMemberListRelationFilter
    messages?: ChatMessageListRelationFilter
  }

  export type ChatroomOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    members?: ChatroomMemberOrderByRelationAggregateInput
    messages?: ChatMessageOrderByRelationAggregateInput
  }

  export type ChatroomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatroomWhereInput | ChatroomWhereInput[]
    OR?: ChatroomWhereInput[]
    NOT?: ChatroomWhereInput | ChatroomWhereInput[]
    workspaceId?: StringFilter<"Chatroom"> | string
    title?: StringNullableFilter<"Chatroom"> | string | null
    description?: StringNullableFilter<"Chatroom"> | string | null
    isPrivate?: BoolFilter<"Chatroom"> | boolean
    createdAt?: DateTimeFilter<"Chatroom"> | Date | string
    updatedAt?: DateTimeFilter<"Chatroom"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    members?: ChatroomMemberListRelationFilter
    messages?: ChatMessageListRelationFilter
  }, "id">

  export type ChatroomOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatroomCountOrderByAggregateInput
    _max?: ChatroomMaxOrderByAggregateInput
    _min?: ChatroomMinOrderByAggregateInput
  }

  export type ChatroomScalarWhereWithAggregatesInput = {
    AND?: ChatroomScalarWhereWithAggregatesInput | ChatroomScalarWhereWithAggregatesInput[]
    OR?: ChatroomScalarWhereWithAggregatesInput[]
    NOT?: ChatroomScalarWhereWithAggregatesInput | ChatroomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chatroom"> | string
    workspaceId?: StringWithAggregatesFilter<"Chatroom"> | string
    title?: StringNullableWithAggregatesFilter<"Chatroom"> | string | null
    description?: StringNullableWithAggregatesFilter<"Chatroom"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"Chatroom"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Chatroom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chatroom"> | Date | string
  }

  export type ChatroomMemberWhereInput = {
    AND?: ChatroomMemberWhereInput | ChatroomMemberWhereInput[]
    OR?: ChatroomMemberWhereInput[]
    NOT?: ChatroomMemberWhereInput | ChatroomMemberWhereInput[]
    chatroomId?: StringFilter<"ChatroomMember"> | string
    userId?: StringFilter<"ChatroomMember"> | string
    workspaceId?: StringFilter<"ChatroomMember"> | string
    role?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadMessageId?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadAt?: DateTimeNullableFilter<"ChatroomMember"> | Date | string | null
    joinedAt?: DateTimeFilter<"ChatroomMember"> | Date | string
    chatroom?: XOR<ChatroomScalarRelationFilter, ChatroomWhereInput>
    workspaceMember?: XOR<WorkspaceMemberScalarRelationFilter, WorkspaceMemberWhereInput>
    messages?: ChatMessageListRelationFilter
  }

  export type ChatroomMemberOrderByWithRelationInput = {
    chatroomId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrderInput | SortOrder
    lastReadMessageId?: SortOrderInput | SortOrder
    lastReadAt?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    chatroom?: ChatroomOrderByWithRelationInput
    workspaceMember?: WorkspaceMemberOrderByWithRelationInput
    messages?: ChatMessageOrderByRelationAggregateInput
  }

  export type ChatroomMemberWhereUniqueInput = Prisma.AtLeast<{
    chatroomId_userId?: ChatroomMemberChatroomIdUserIdCompoundUniqueInput
    AND?: ChatroomMemberWhereInput | ChatroomMemberWhereInput[]
    OR?: ChatroomMemberWhereInput[]
    NOT?: ChatroomMemberWhereInput | ChatroomMemberWhereInput[]
    chatroomId?: StringFilter<"ChatroomMember"> | string
    userId?: StringFilter<"ChatroomMember"> | string
    workspaceId?: StringFilter<"ChatroomMember"> | string
    role?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadMessageId?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadAt?: DateTimeNullableFilter<"ChatroomMember"> | Date | string | null
    joinedAt?: DateTimeFilter<"ChatroomMember"> | Date | string
    chatroom?: XOR<ChatroomScalarRelationFilter, ChatroomWhereInput>
    workspaceMember?: XOR<WorkspaceMemberScalarRelationFilter, WorkspaceMemberWhereInput>
    messages?: ChatMessageListRelationFilter
  }, "chatroomId_userId">

  export type ChatroomMemberOrderByWithAggregationInput = {
    chatroomId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrderInput | SortOrder
    lastReadMessageId?: SortOrderInput | SortOrder
    lastReadAt?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    _count?: ChatroomMemberCountOrderByAggregateInput
    _max?: ChatroomMemberMaxOrderByAggregateInput
    _min?: ChatroomMemberMinOrderByAggregateInput
  }

  export type ChatroomMemberScalarWhereWithAggregatesInput = {
    AND?: ChatroomMemberScalarWhereWithAggregatesInput | ChatroomMemberScalarWhereWithAggregatesInput[]
    OR?: ChatroomMemberScalarWhereWithAggregatesInput[]
    NOT?: ChatroomMemberScalarWhereWithAggregatesInput | ChatroomMemberScalarWhereWithAggregatesInput[]
    chatroomId?: StringWithAggregatesFilter<"ChatroomMember"> | string
    userId?: StringWithAggregatesFilter<"ChatroomMember"> | string
    workspaceId?: StringWithAggregatesFilter<"ChatroomMember"> | string
    role?: StringNullableWithAggregatesFilter<"ChatroomMember"> | string | null
    lastReadMessageId?: StringNullableWithAggregatesFilter<"ChatroomMember"> | string | null
    lastReadAt?: DateTimeNullableWithAggregatesFilter<"ChatroomMember"> | Date | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"ChatroomMember"> | Date | string
  }

  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    chatroomId?: StringFilter<"ChatMessage"> | string
    senderId?: StringFilter<"ChatMessage"> | string
    content?: StringFilter<"ChatMessage"> | string
    type?: StringFilter<"ChatMessage"> | string
    isEdited?: BoolNullableFilter<"ChatMessage"> | boolean | null
    isDeleted?: BoolNullableFilter<"ChatMessage"> | boolean | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
    chatroom?: XOR<ChatroomScalarRelationFilter, ChatroomWhereInput>
    sender?: XOR<ChatroomMemberScalarRelationFilter, ChatroomMemberWhereInput>
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    chatroomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isEdited?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chatroom?: ChatroomOrderByWithRelationInput
    sender?: ChatroomMemberOrderByWithRelationInput
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    chatroomId?: StringFilter<"ChatMessage"> | string
    senderId?: StringFilter<"ChatMessage"> | string
    content?: StringFilter<"ChatMessage"> | string
    type?: StringFilter<"ChatMessage"> | string
    isEdited?: BoolNullableFilter<"ChatMessage"> | boolean | null
    isDeleted?: BoolNullableFilter<"ChatMessage"> | boolean | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
    chatroom?: XOR<ChatroomScalarRelationFilter, ChatroomWhereInput>
    sender?: XOR<ChatroomMemberScalarRelationFilter, ChatroomMemberWhereInput>
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    chatroomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isEdited?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMessage"> | string
    chatroomId?: StringWithAggregatesFilter<"ChatMessage"> | string
    senderId?: StringWithAggregatesFilter<"ChatMessage"> | string
    content?: StringWithAggregatesFilter<"ChatMessage"> | string
    type?: StringWithAggregatesFilter<"ChatMessage"> | string
    isEdited?: BoolNullableWithAggregatesFilter<"ChatMessage"> | boolean | null
    isDeleted?: BoolNullableWithAggregatesFilter<"ChatMessage"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
  }

  export type NanoWhereInput = {
    AND?: NanoWhereInput | NanoWhereInput[]
    OR?: NanoWhereInput[]
    NOT?: NanoWhereInput | NanoWhereInput[]
    id?: StringFilter<"Nano"> | string
    workspaceId?: StringFilter<"Nano"> | string
    parentNanoId?: StringNullableFilter<"Nano"> | string | null
    type?: StringNullableFilter<"Nano"> | string | null
    title?: StringNullableFilter<"Nano"> | string | null
    content?: JsonNullableFilter<"Nano">
    writerId?: StringNullableFilter<"Nano"> | string | null
    position?: FloatFilter<"Nano"> | number
    version?: IntFilter<"Nano"> | number
    createdAt?: DateTimeFilter<"Nano"> | Date | string
    updatedAt?: DateTimeFilter<"Nano"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
    parentDeletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
    parent?: XOR<NanoNullableScalarRelationFilter, NanoWhereInput> | null
    children?: NanoListRelationFilter
    writerMember?: XOR<WorkspaceMemberNullableScalarRelationFilter, WorkspaceMemberWhereInput> | null
    histories?: NanoHistoryListRelationFilter
    pendingNanos?: PendingNanoListRelationFilter
  }

  export type NanoOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    parentNanoId?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    writerId?: SortOrderInput | SortOrder
    position?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    parentDeletedAt?: SortOrderInput | SortOrder
    parent?: NanoOrderByWithRelationInput
    children?: NanoOrderByRelationAggregateInput
    writerMember?: WorkspaceMemberOrderByWithRelationInput
    histories?: NanoHistoryOrderByRelationAggregateInput
    pendingNanos?: PendingNanoOrderByRelationAggregateInput
  }

  export type NanoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NanoWhereInput | NanoWhereInput[]
    OR?: NanoWhereInput[]
    NOT?: NanoWhereInput | NanoWhereInput[]
    workspaceId?: StringFilter<"Nano"> | string
    parentNanoId?: StringNullableFilter<"Nano"> | string | null
    type?: StringNullableFilter<"Nano"> | string | null
    title?: StringNullableFilter<"Nano"> | string | null
    content?: JsonNullableFilter<"Nano">
    writerId?: StringNullableFilter<"Nano"> | string | null
    position?: FloatFilter<"Nano"> | number
    version?: IntFilter<"Nano"> | number
    createdAt?: DateTimeFilter<"Nano"> | Date | string
    updatedAt?: DateTimeFilter<"Nano"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
    parentDeletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
    parent?: XOR<NanoNullableScalarRelationFilter, NanoWhereInput> | null
    children?: NanoListRelationFilter
    writerMember?: XOR<WorkspaceMemberNullableScalarRelationFilter, WorkspaceMemberWhereInput> | null
    histories?: NanoHistoryListRelationFilter
    pendingNanos?: PendingNanoListRelationFilter
  }, "id">

  export type NanoOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    parentNanoId?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    writerId?: SortOrderInput | SortOrder
    position?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    parentDeletedAt?: SortOrderInput | SortOrder
    _count?: NanoCountOrderByAggregateInput
    _avg?: NanoAvgOrderByAggregateInput
    _max?: NanoMaxOrderByAggregateInput
    _min?: NanoMinOrderByAggregateInput
    _sum?: NanoSumOrderByAggregateInput
  }

  export type NanoScalarWhereWithAggregatesInput = {
    AND?: NanoScalarWhereWithAggregatesInput | NanoScalarWhereWithAggregatesInput[]
    OR?: NanoScalarWhereWithAggregatesInput[]
    NOT?: NanoScalarWhereWithAggregatesInput | NanoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Nano"> | string
    workspaceId?: StringWithAggregatesFilter<"Nano"> | string
    parentNanoId?: StringNullableWithAggregatesFilter<"Nano"> | string | null
    type?: StringNullableWithAggregatesFilter<"Nano"> | string | null
    title?: StringNullableWithAggregatesFilter<"Nano"> | string | null
    content?: JsonNullableWithAggregatesFilter<"Nano">
    writerId?: StringNullableWithAggregatesFilter<"Nano"> | string | null
    position?: FloatWithAggregatesFilter<"Nano"> | number
    version?: IntWithAggregatesFilter<"Nano"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Nano"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Nano"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Nano"> | Date | string | null
    parentDeletedAt?: DateTimeNullableWithAggregatesFilter<"Nano"> | Date | string | null
  }

  export type NanoHistoryWhereInput = {
    AND?: NanoHistoryWhereInput | NanoHistoryWhereInput[]
    OR?: NanoHistoryWhereInput[]
    NOT?: NanoHistoryWhereInput | NanoHistoryWhereInput[]
    id?: StringFilter<"NanoHistory"> | string
    nanoId?: StringFilter<"NanoHistory"> | string
    version?: StringNullableFilter<"NanoHistory"> | string | null
    title?: StringNullableFilter<"NanoHistory"> | string | null
    content?: JsonNullableFilter<"NanoHistory">
    writerId?: StringNullableFilter<"NanoHistory"> | string | null
    workspaceId?: StringFilter<"NanoHistory"> | string
    createdAt?: DateTimeFilter<"NanoHistory"> | Date | string
    updatedAt?: DateTimeFilter<"NanoHistory"> | Date | string
    nano?: XOR<NanoScalarRelationFilter, NanoWhereInput>
    approvalRequest?: ApprovalRequestListRelationFilter
    writer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type NanoHistoryOrderByWithRelationInput = {
    id?: SortOrder
    nanoId?: SortOrder
    version?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    writerId?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nano?: NanoOrderByWithRelationInput
    approvalRequest?: ApprovalRequestOrderByRelationAggregateInput
    writer?: UserOrderByWithRelationInput
  }

  export type NanoHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NanoHistoryWhereInput | NanoHistoryWhereInput[]
    OR?: NanoHistoryWhereInput[]
    NOT?: NanoHistoryWhereInput | NanoHistoryWhereInput[]
    nanoId?: StringFilter<"NanoHistory"> | string
    version?: StringNullableFilter<"NanoHistory"> | string | null
    title?: StringNullableFilter<"NanoHistory"> | string | null
    content?: JsonNullableFilter<"NanoHistory">
    writerId?: StringNullableFilter<"NanoHistory"> | string | null
    workspaceId?: StringFilter<"NanoHistory"> | string
    createdAt?: DateTimeFilter<"NanoHistory"> | Date | string
    updatedAt?: DateTimeFilter<"NanoHistory"> | Date | string
    nano?: XOR<NanoScalarRelationFilter, NanoWhereInput>
    approvalRequest?: ApprovalRequestListRelationFilter
    writer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type NanoHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    nanoId?: SortOrder
    version?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    writerId?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NanoHistoryCountOrderByAggregateInput
    _max?: NanoHistoryMaxOrderByAggregateInput
    _min?: NanoHistoryMinOrderByAggregateInput
  }

  export type NanoHistoryScalarWhereWithAggregatesInput = {
    AND?: NanoHistoryScalarWhereWithAggregatesInput | NanoHistoryScalarWhereWithAggregatesInput[]
    OR?: NanoHistoryScalarWhereWithAggregatesInput[]
    NOT?: NanoHistoryScalarWhereWithAggregatesInput | NanoHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NanoHistory"> | string
    nanoId?: StringWithAggregatesFilter<"NanoHistory"> | string
    version?: StringNullableWithAggregatesFilter<"NanoHistory"> | string | null
    title?: StringNullableWithAggregatesFilter<"NanoHistory"> | string | null
    content?: JsonNullableWithAggregatesFilter<"NanoHistory">
    writerId?: StringNullableWithAggregatesFilter<"NanoHistory"> | string | null
    workspaceId?: StringWithAggregatesFilter<"NanoHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NanoHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NanoHistory"> | Date | string
  }

  export type ApprovalRequestWhereInput = {
    AND?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    OR?: ApprovalRequestWhereInput[]
    NOT?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    id?: StringFilter<"ApprovalRequest"> | string
    nanoId?: StringFilter<"ApprovalRequest"> | string
    historyId?: StringFilter<"ApprovalRequest"> | string
    status?: StringNullableFilter<"ApprovalRequest"> | string | null
    targetVersion?: IntFilter<"ApprovalRequest"> | number
    createdAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
    history?: XOR<NanoHistoryScalarRelationFilter, NanoHistoryWhereInput>
    pendingNano?: XOR<PendingNanoNullableScalarRelationFilter, PendingNanoWhereInput> | null
  }

  export type ApprovalRequestOrderByWithRelationInput = {
    id?: SortOrder
    nanoId?: SortOrder
    historyId?: SortOrder
    status?: SortOrderInput | SortOrder
    targetVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    history?: NanoHistoryOrderByWithRelationInput
    pendingNano?: PendingNanoOrderByWithRelationInput
  }

  export type ApprovalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    OR?: ApprovalRequestWhereInput[]
    NOT?: ApprovalRequestWhereInput | ApprovalRequestWhereInput[]
    nanoId?: StringFilter<"ApprovalRequest"> | string
    historyId?: StringFilter<"ApprovalRequest"> | string
    status?: StringNullableFilter<"ApprovalRequest"> | string | null
    targetVersion?: IntFilter<"ApprovalRequest"> | number
    createdAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
    history?: XOR<NanoHistoryScalarRelationFilter, NanoHistoryWhereInput>
    pendingNano?: XOR<PendingNanoNullableScalarRelationFilter, PendingNanoWhereInput> | null
  }, "id">

  export type ApprovalRequestOrderByWithAggregationInput = {
    id?: SortOrder
    nanoId?: SortOrder
    historyId?: SortOrder
    status?: SortOrderInput | SortOrder
    targetVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApprovalRequestCountOrderByAggregateInput
    _avg?: ApprovalRequestAvgOrderByAggregateInput
    _max?: ApprovalRequestMaxOrderByAggregateInput
    _min?: ApprovalRequestMinOrderByAggregateInput
    _sum?: ApprovalRequestSumOrderByAggregateInput
  }

  export type ApprovalRequestScalarWhereWithAggregatesInput = {
    AND?: ApprovalRequestScalarWhereWithAggregatesInput | ApprovalRequestScalarWhereWithAggregatesInput[]
    OR?: ApprovalRequestScalarWhereWithAggregatesInput[]
    NOT?: ApprovalRequestScalarWhereWithAggregatesInput | ApprovalRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    nanoId?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    historyId?: StringWithAggregatesFilter<"ApprovalRequest"> | string
    status?: StringNullableWithAggregatesFilter<"ApprovalRequest"> | string | null
    targetVersion?: IntWithAggregatesFilter<"ApprovalRequest"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ApprovalRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApprovalRequest"> | Date | string
  }

  export type PendingNanoWhereInput = {
    AND?: PendingNanoWhereInput | PendingNanoWhereInput[]
    OR?: PendingNanoWhereInput[]
    NOT?: PendingNanoWhereInput | PendingNanoWhereInput[]
    approvalId?: StringFilter<"PendingNano"> | string
    nanoId?: StringNullableFilter<"PendingNano"> | string | null
    comment?: StringNullableFilter<"PendingNano"> | string | null
    createdAt?: DateTimeFilter<"PendingNano"> | Date | string
    approval?: XOR<ApprovalRequestScalarRelationFilter, ApprovalRequestWhereInput>
    nano?: XOR<NanoNullableScalarRelationFilter, NanoWhereInput> | null
  }

  export type PendingNanoOrderByWithRelationInput = {
    approvalId?: SortOrder
    nanoId?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    approval?: ApprovalRequestOrderByWithRelationInput
    nano?: NanoOrderByWithRelationInput
  }

  export type PendingNanoWhereUniqueInput = Prisma.AtLeast<{
    approvalId?: string
    AND?: PendingNanoWhereInput | PendingNanoWhereInput[]
    OR?: PendingNanoWhereInput[]
    NOT?: PendingNanoWhereInput | PendingNanoWhereInput[]
    nanoId?: StringNullableFilter<"PendingNano"> | string | null
    comment?: StringNullableFilter<"PendingNano"> | string | null
    createdAt?: DateTimeFilter<"PendingNano"> | Date | string
    approval?: XOR<ApprovalRequestScalarRelationFilter, ApprovalRequestWhereInput>
    nano?: XOR<NanoNullableScalarRelationFilter, NanoWhereInput> | null
  }, "approvalId">

  export type PendingNanoOrderByWithAggregationInput = {
    approvalId?: SortOrder
    nanoId?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PendingNanoCountOrderByAggregateInput
    _max?: PendingNanoMaxOrderByAggregateInput
    _min?: PendingNanoMinOrderByAggregateInput
  }

  export type PendingNanoScalarWhereWithAggregatesInput = {
    AND?: PendingNanoScalarWhereWithAggregatesInput | PendingNanoScalarWhereWithAggregatesInput[]
    OR?: PendingNanoScalarWhereWithAggregatesInput[]
    NOT?: PendingNanoScalarWhereWithAggregatesInput | PendingNanoScalarWhereWithAggregatesInput[]
    approvalId?: StringWithAggregatesFilter<"PendingNano"> | string
    nanoId?: StringNullableWithAggregatesFilter<"PendingNano"> | string | null
    comment?: StringNullableWithAggregatesFilter<"PendingNano"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PendingNano"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    hashedToken?: StringFilter<"RefreshToken"> | string
    jti?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    hashedToken?: SortOrder
    jti?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jti?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    hashedToken?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "jti">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    hashedToken?: SortOrder
    jti?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    hashedToken?: StringWithAggregatesFilter<"RefreshToken"> | string
    jti?: StringWithAggregatesFilter<"RefreshToken"> | string
    userAgent?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryCreateNestedManyWithoutWriterInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceUncheckedCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryUncheckedCreateNestedManyWithoutWriterInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUpdateManyWithoutWriterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUncheckedUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserPreferenceCreateInput = {
    language?: string | null
    theme?: string | null
    timezone?: string | null
    user: UserCreateNestedOneWithoutPreferenceInput
  }

  export type UserPreferenceUncheckedCreateInput = {
    userId: string
    language?: string | null
    theme?: string | null
    timezone?: string | null
  }

  export type UserPreferenceUpdateInput = {
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutPreferenceNestedInput
  }

  export type UserPreferenceUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserPreferenceCreateManyInput = {
    userId: string
    language?: string | null
    theme?: string | null
    timezone?: string | null
  }

  export type UserPreferenceUpdateManyMutationInput = {
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserPreferenceUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkspaceCreateInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    invitations?: WorkspaceInvitationCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    invitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    invitations?: WorkspaceInvitationUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    invitations?: WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkspaceInvitationCreateInput = {
    id?: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    workspace: WorkspaceCreateNestedOneWithoutInvitationsInput
    inviter: UserCreateNestedOneWithoutWorkspaceInvitationsInput
  }

  export type WorkspaceInvitationUncheckedCreateInput = {
    id?: string
    workspaceId: string
    inviterId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type WorkspaceInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutInvitationsNestedInput
    inviter?: UserUpdateOneRequiredWithoutWorkspaceInvitationsNestedInput
  }

  export type WorkspaceInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationCreateManyInput = {
    id?: string
    workspaceId: string
    inviterId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type WorkspaceInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateInput = {
    role?: string | null
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
    chatroomMembers?: ChatroomMemberCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberUncheckedCreateInput = {
    workspaceId: string
    userId: string
    role?: string | null
    joinedAt?: Date | string
    chatroomMembers?: ChatroomMemberUncheckedCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoUncheckedCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberUpdateInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
    chatroomMembers?: ChatroomMemberUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroomMembers?: ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUncheckedUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberCreateManyInput = {
    workspaceId: string
    userId: string
    role?: string | null
    joinedAt?: Date | string
  }

  export type WorkspaceMemberUpdateManyMutationInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomCreateInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutChatroomsInput
    members?: ChatroomMemberCreateNestedManyWithoutChatroomInput
    messages?: ChatMessageCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomUncheckedCreateInput = {
    id?: string
    workspaceId: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatroomMemberUncheckedCreateNestedManyWithoutChatroomInput
    messages?: ChatMessageUncheckedCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutChatroomsNestedInput
    members?: ChatroomMemberUpdateManyWithoutChatroomNestedInput
    messages?: ChatMessageUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatroomMemberUncheckedUpdateManyWithoutChatroomNestedInput
    messages?: ChatMessageUncheckedUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomCreateManyInput = {
    id?: string
    workspaceId: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatroomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomMemberCreateInput = {
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    chatroom: ChatroomCreateNestedOneWithoutMembersInput
    workspaceMember: WorkspaceMemberCreateNestedOneWithoutChatroomMembersInput
    messages?: ChatMessageCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberUncheckedCreateInput = {
    chatroomId: string
    userId: string
    workspaceId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberUpdateInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroom?: ChatroomUpdateOneRequiredWithoutMembersNestedInput
    workspaceMember?: WorkspaceMemberUpdateOneRequiredWithoutChatroomMembersNestedInput
    messages?: ChatMessageUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberUncheckedUpdateInput = {
    chatroomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberCreateManyInput = {
    chatroomId: string
    userId: string
    workspaceId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
  }

  export type ChatroomMemberUpdateManyMutationInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomMemberUncheckedUpdateManyInput = {
    chatroomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateInput = {
    id?: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatroom: ChatroomCreateNestedOneWithoutMessagesInput
    sender: ChatroomMemberCreateNestedOneWithoutMessagesInput
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: string
    chatroomId: string
    senderId: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroom?: ChatroomUpdateOneRequiredWithoutMessagesNestedInput
    sender?: ChatroomMemberUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatroomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateManyInput = {
    id?: string
    chatroomId: string
    senderId: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatroomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoCreateInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    parent?: NanoCreateNestedOneWithoutChildrenInput
    children?: NanoCreateNestedManyWithoutParentInput
    writerMember?: WorkspaceMemberCreateNestedOneWithoutNanosInput
    histories?: NanoHistoryCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateInput = {
    id?: string
    workspaceId: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoUncheckedCreateNestedManyWithoutParentInput
    histories?: NanoHistoryUncheckedCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: NanoUpdateOneWithoutChildrenNestedInput
    children?: NanoUpdateManyWithoutParentNestedInput
    writerMember?: WorkspaceMemberUpdateOneWithoutNanosNestedInput
    histories?: NanoHistoryUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUncheckedUpdateManyWithoutParentNestedInput
    histories?: NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type NanoCreateManyInput = {
    id?: string
    workspaceId: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
  }

  export type NanoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NanoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NanoHistoryCreateInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nano: NanoCreateNestedOneWithoutHistoriesInput
    approvalRequest?: ApprovalRequestCreateNestedManyWithoutHistoryInput
    writer?: UserCreateNestedOneWithoutNanoHistorysInput
  }

  export type NanoHistoryUncheckedCreateInput = {
    id?: string
    nanoId: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type NanoHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nano?: NanoUpdateOneRequiredWithoutHistoriesNestedInput
    approvalRequest?: ApprovalRequestUpdateManyWithoutHistoryNestedInput
    writer?: UserUpdateOneWithoutNanoHistorysNestedInput
  }

  export type NanoHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalRequest?: ApprovalRequestUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type NanoHistoryCreateManyInput = {
    id?: string
    nanoId: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NanoHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalRequestCreateInput = {
    id?: string
    nanoId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    history: NanoHistoryCreateNestedOneWithoutApprovalRequestInput
    pendingNano?: PendingNanoCreateNestedOneWithoutApprovalInput
  }

  export type ApprovalRequestUncheckedCreateInput = {
    id?: string
    nanoId: string
    historyId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pendingNano?: PendingNanoUncheckedCreateNestedOneWithoutApprovalInput
  }

  export type ApprovalRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: NanoHistoryUpdateOneRequiredWithoutApprovalRequestNestedInput
    pendingNano?: PendingNanoUpdateOneWithoutApprovalNestedInput
  }

  export type ApprovalRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    historyId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pendingNano?: PendingNanoUncheckedUpdateOneWithoutApprovalNestedInput
  }

  export type ApprovalRequestCreateManyInput = {
    id?: string
    nanoId: string
    historyId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApprovalRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    historyId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoCreateInput = {
    comment?: string | null
    createdAt?: Date | string
    approval: ApprovalRequestCreateNestedOneWithoutPendingNanoInput
    nano?: NanoCreateNestedOneWithoutPendingNanosInput
  }

  export type PendingNanoUncheckedCreateInput = {
    approvalId: string
    nanoId?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type PendingNanoUpdateInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approval?: ApprovalRequestUpdateOneRequiredWithoutPendingNanoNestedInput
    nano?: NanoUpdateOneWithoutPendingNanosNestedInput
  }

  export type PendingNanoUncheckedUpdateInput = {
    approvalId?: StringFieldUpdateOperationsInput | string
    nanoId?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoCreateManyInput = {
    approvalId: string
    nanoId?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type PendingNanoUpdateManyMutationInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoUncheckedUpdateManyInput = {
    approvalId?: StringFieldUpdateOperationsInput | string
    nanoId?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    userId: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    userId: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserPreferenceNullableScalarRelationFilter = {
    is?: UserPreferenceWhereInput | null
    isNot?: UserPreferenceWhereInput | null
  }

  export type WorkspaceMemberListRelationFilter = {
    every?: WorkspaceMemberWhereInput
    some?: WorkspaceMemberWhereInput
    none?: WorkspaceMemberWhereInput
  }

  export type WorkspaceInvitationListRelationFilter = {
    every?: WorkspaceInvitationWhereInput
    some?: WorkspaceInvitationWhereInput
    none?: WorkspaceInvitationWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type NanoHistoryListRelationFilter = {
    every?: NanoHistoryWhereInput
    some?: NanoHistoryWhereInput
    none?: NanoHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkspaceMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NanoHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserPreferenceCountOrderByAggregateInput = {
    userId?: SortOrder
    language?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
  }

  export type UserPreferenceMaxOrderByAggregateInput = {
    userId?: SortOrder
    language?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
  }

  export type UserPreferenceMinOrderByAggregateInput = {
    userId?: SortOrder
    language?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
  }

  export type ChatroomListRelationFilter = {
    every?: ChatroomWhereInput
    some?: ChatroomWhereInput
    none?: ChatroomWhereInput
  }

  export type ChatroomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkspaceScalarRelationFilter = {
    is?: WorkspaceWhereInput
    isNot?: WorkspaceWhereInput
  }

  export type WorkspaceInvitationWorkspaceIdTargetEmailStatusCompoundUniqueInput = {
    workspaceId: string
    targetEmail: string
    status: string
  }

  export type WorkspaceInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    inviterId?: SortOrder
    targetEmail?: SortOrder
    invitation?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type WorkspaceInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    inviterId?: SortOrder
    targetEmail?: SortOrder
    invitation?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type WorkspaceInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    inviterId?: SortOrder
    targetEmail?: SortOrder
    invitation?: SortOrder
    token?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChatroomMemberListRelationFilter = {
    every?: ChatroomMemberWhereInput
    some?: ChatroomMemberWhereInput
    none?: ChatroomMemberWhereInput
  }

  export type NanoListRelationFilter = {
    every?: NanoWhereInput
    some?: NanoWhereInput
    none?: NanoWhereInput
  }

  export type ChatroomMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NanoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceMemberWorkspaceIdUserIdCompoundUniqueInput = {
    workspaceId: string
    userId: string
  }

  export type WorkspaceMemberCountOrderByAggregateInput = {
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMaxOrderByAggregateInput = {
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMinOrderByAggregateInput = {
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ChatMessageListRelationFilter = {
    every?: ChatMessageWhereInput
    some?: ChatMessageWhereInput
    none?: ChatMessageWhereInput
  }

  export type ChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatroomCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatroomMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatroomMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChatroomScalarRelationFilter = {
    is?: ChatroomWhereInput
    isNot?: ChatroomWhereInput
  }

  export type WorkspaceMemberScalarRelationFilter = {
    is?: WorkspaceMemberWhereInput
    isNot?: WorkspaceMemberWhereInput
  }

  export type ChatroomMemberChatroomIdUserIdCompoundUniqueInput = {
    chatroomId: string
    userId: string
  }

  export type ChatroomMemberCountOrderByAggregateInput = {
    chatroomId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    lastReadMessageId?: SortOrder
    lastReadAt?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChatroomMemberMaxOrderByAggregateInput = {
    chatroomId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    lastReadMessageId?: SortOrder
    lastReadAt?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChatroomMemberMinOrderByAggregateInput = {
    chatroomId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    lastReadMessageId?: SortOrder
    lastReadAt?: SortOrder
    joinedAt?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ChatroomMemberScalarRelationFilter = {
    is?: ChatroomMemberWhereInput
    isNot?: ChatroomMemberWhereInput
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    chatroomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isEdited?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    chatroomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isEdited?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    chatroomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isEdited?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NanoNullableScalarRelationFilter = {
    is?: NanoWhereInput | null
    isNot?: NanoWhereInput | null
  }

  export type WorkspaceMemberNullableScalarRelationFilter = {
    is?: WorkspaceMemberWhereInput | null
    isNot?: WorkspaceMemberWhereInput | null
  }

  export type PendingNanoListRelationFilter = {
    every?: PendingNanoWhereInput
    some?: PendingNanoWhereInput
    none?: PendingNanoWhereInput
  }

  export type PendingNanoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NanoCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    parentNanoId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content?: SortOrder
    writerId?: SortOrder
    position?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    parentDeletedAt?: SortOrder
  }

  export type NanoAvgOrderByAggregateInput = {
    position?: SortOrder
    version?: SortOrder
  }

  export type NanoMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    parentNanoId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    writerId?: SortOrder
    position?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    parentDeletedAt?: SortOrder
  }

  export type NanoMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    parentNanoId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    writerId?: SortOrder
    position?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    parentDeletedAt?: SortOrder
  }

  export type NanoSumOrderByAggregateInput = {
    position?: SortOrder
    version?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NanoScalarRelationFilter = {
    is?: NanoWhereInput
    isNot?: NanoWhereInput
  }

  export type ApprovalRequestListRelationFilter = {
    every?: ApprovalRequestWhereInput
    some?: ApprovalRequestWhereInput
    none?: ApprovalRequestWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ApprovalRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NanoHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    writerId?: SortOrder
    workspaceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NanoHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    version?: SortOrder
    title?: SortOrder
    writerId?: SortOrder
    workspaceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NanoHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    version?: SortOrder
    title?: SortOrder
    writerId?: SortOrder
    workspaceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NanoHistoryScalarRelationFilter = {
    is?: NanoHistoryWhereInput
    isNot?: NanoHistoryWhereInput
  }

  export type PendingNanoNullableScalarRelationFilter = {
    is?: PendingNanoWhereInput | null
    isNot?: PendingNanoWhereInput | null
  }

  export type ApprovalRequestCountOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    historyId?: SortOrder
    status?: SortOrder
    targetVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRequestAvgOrderByAggregateInput = {
    targetVersion?: SortOrder
  }

  export type ApprovalRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    historyId?: SortOrder
    status?: SortOrder
    targetVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRequestMinOrderByAggregateInput = {
    id?: SortOrder
    nanoId?: SortOrder
    historyId?: SortOrder
    status?: SortOrder
    targetVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApprovalRequestSumOrderByAggregateInput = {
    targetVersion?: SortOrder
  }

  export type ApprovalRequestScalarRelationFilter = {
    is?: ApprovalRequestWhereInput
    isNot?: ApprovalRequestWhereInput
  }

  export type PendingNanoCountOrderByAggregateInput = {
    approvalId?: SortOrder
    nanoId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingNanoMaxOrderByAggregateInput = {
    approvalId?: SortOrder
    nanoId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingNanoMinOrderByAggregateInput = {
    approvalId?: SortOrder
    nanoId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hashedToken?: SortOrder
    jti?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hashedToken?: SortOrder
    jti?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hashedToken?: SortOrder
    jti?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserPreferenceCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput
    connect?: UserPreferenceWhereUniqueInput
  }

  export type WorkspaceMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type WorkspaceInvitationCreateNestedManyWithoutInviterInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput> | WorkspaceInvitationCreateWithoutInviterInput[] | WorkspaceInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutInviterInput | WorkspaceInvitationCreateOrConnectWithoutInviterInput[]
    createMany?: WorkspaceInvitationCreateManyInviterInputEnvelope
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type NanoHistoryCreateNestedManyWithoutWriterInput = {
    create?: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput> | NanoHistoryCreateWithoutWriterInput[] | NanoHistoryUncheckedCreateWithoutWriterInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutWriterInput | NanoHistoryCreateOrConnectWithoutWriterInput[]
    createMany?: NanoHistoryCreateManyWriterInputEnvelope
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
  }

  export type UserPreferenceUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput
    connect?: UserPreferenceWhereUniqueInput
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput> | WorkspaceInvitationCreateWithoutInviterInput[] | WorkspaceInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutInviterInput | WorkspaceInvitationCreateOrConnectWithoutInviterInput[]
    createMany?: WorkspaceInvitationCreateManyInviterInputEnvelope
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type NanoHistoryUncheckedCreateNestedManyWithoutWriterInput = {
    create?: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput> | NanoHistoryCreateWithoutWriterInput[] | NanoHistoryUncheckedCreateWithoutWriterInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutWriterInput | NanoHistoryCreateOrConnectWithoutWriterInput[]
    createMany?: NanoHistoryCreateManyWriterInputEnvelope
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserPreferenceUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput
    upsert?: UserPreferenceUpsertWithoutUserInput
    disconnect?: UserPreferenceWhereInput | boolean
    delete?: UserPreferenceWhereInput | boolean
    connect?: UserPreferenceWhereUniqueInput
    update?: XOR<XOR<UserPreferenceUpdateToOneWithWhereWithoutUserInput, UserPreferenceUpdateWithoutUserInput>, UserPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type WorkspaceInvitationUpdateManyWithoutInviterNestedInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput> | WorkspaceInvitationCreateWithoutInviterInput[] | WorkspaceInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutInviterInput | WorkspaceInvitationCreateOrConnectWithoutInviterInput[]
    upsert?: WorkspaceInvitationUpsertWithWhereUniqueWithoutInviterInput | WorkspaceInvitationUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: WorkspaceInvitationCreateManyInviterInputEnvelope
    set?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    disconnect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    delete?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    update?: WorkspaceInvitationUpdateWithWhereUniqueWithoutInviterInput | WorkspaceInvitationUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: WorkspaceInvitationUpdateManyWithWhereWithoutInviterInput | WorkspaceInvitationUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type NanoHistoryUpdateManyWithoutWriterNestedInput = {
    create?: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput> | NanoHistoryCreateWithoutWriterInput[] | NanoHistoryUncheckedCreateWithoutWriterInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutWriterInput | NanoHistoryCreateOrConnectWithoutWriterInput[]
    upsert?: NanoHistoryUpsertWithWhereUniqueWithoutWriterInput | NanoHistoryUpsertWithWhereUniqueWithoutWriterInput[]
    createMany?: NanoHistoryCreateManyWriterInputEnvelope
    set?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    disconnect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    delete?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    update?: NanoHistoryUpdateWithWhereUniqueWithoutWriterInput | NanoHistoryUpdateWithWhereUniqueWithoutWriterInput[]
    updateMany?: NanoHistoryUpdateManyWithWhereWithoutWriterInput | NanoHistoryUpdateManyWithWhereWithoutWriterInput[]
    deleteMany?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
  }

  export type UserPreferenceUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput
    upsert?: UserPreferenceUpsertWithoutUserInput
    disconnect?: UserPreferenceWhereInput | boolean
    delete?: UserPreferenceWhereInput | boolean
    connect?: UserPreferenceWhereUniqueInput
    update?: XOR<XOR<UserPreferenceUpdateToOneWithWhereWithoutUserInput, UserPreferenceUpdateWithoutUserInput>, UserPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput> | WorkspaceInvitationCreateWithoutInviterInput[] | WorkspaceInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutInviterInput | WorkspaceInvitationCreateOrConnectWithoutInviterInput[]
    upsert?: WorkspaceInvitationUpsertWithWhereUniqueWithoutInviterInput | WorkspaceInvitationUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: WorkspaceInvitationCreateManyInviterInputEnvelope
    set?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    disconnect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    delete?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    update?: WorkspaceInvitationUpdateWithWhereUniqueWithoutInviterInput | WorkspaceInvitationUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: WorkspaceInvitationUpdateManyWithWhereWithoutInviterInput | WorkspaceInvitationUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput = {
    create?: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput> | NanoHistoryCreateWithoutWriterInput[] | NanoHistoryUncheckedCreateWithoutWriterInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutWriterInput | NanoHistoryCreateOrConnectWithoutWriterInput[]
    upsert?: NanoHistoryUpsertWithWhereUniqueWithoutWriterInput | NanoHistoryUpsertWithWhereUniqueWithoutWriterInput[]
    createMany?: NanoHistoryCreateManyWriterInputEnvelope
    set?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    disconnect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    delete?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    update?: NanoHistoryUpdateWithWhereUniqueWithoutWriterInput | NanoHistoryUpdateWithWhereUniqueWithoutWriterInput[]
    updateMany?: NanoHistoryUpdateManyWithWhereWithoutWriterInput | NanoHistoryUpdateManyWithWhereWithoutWriterInput[]
    deleteMany?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPreferenceInput = {
    create?: XOR<UserCreateWithoutPreferenceInput, UserUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferenceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPreferenceNestedInput = {
    create?: XOR<UserCreateWithoutPreferenceInput, UserUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferenceInput
    upsert?: UserUpsertWithoutPreferenceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPreferenceInput, UserUpdateWithoutPreferenceInput>, UserUncheckedUpdateWithoutPreferenceInput>
  }

  export type WorkspaceMemberCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type WorkspaceInvitationCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput> | WorkspaceInvitationCreateWithoutWorkspaceInput[] | WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput | WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceInvitationCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
  }

  export type ChatroomCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput> | ChatroomCreateWithoutWorkspaceInput[] | ChatroomUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ChatroomCreateOrConnectWithoutWorkspaceInput | ChatroomCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ChatroomCreateManyWorkspaceInputEnvelope
    connect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type WorkspaceInvitationUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput> | WorkspaceInvitationCreateWithoutWorkspaceInput[] | WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput | WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceInvitationCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
  }

  export type ChatroomUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput> | ChatroomCreateWithoutWorkspaceInput[] | ChatroomUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ChatroomCreateOrConnectWithoutWorkspaceInput | ChatroomCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ChatroomCreateManyWorkspaceInputEnvelope
    connect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
  }

  export type WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type WorkspaceInvitationUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput> | WorkspaceInvitationCreateWithoutWorkspaceInput[] | WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput | WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceInvitationUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceInvitationUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceInvitationCreateManyWorkspaceInputEnvelope
    set?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    disconnect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    delete?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    update?: WorkspaceInvitationUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceInvitationUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceInvitationUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceInvitationUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
  }

  export type ChatroomUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput> | ChatroomCreateWithoutWorkspaceInput[] | ChatroomUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ChatroomCreateOrConnectWithoutWorkspaceInput | ChatroomCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ChatroomUpsertWithWhereUniqueWithoutWorkspaceInput | ChatroomUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ChatroomCreateManyWorkspaceInputEnvelope
    set?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    disconnect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    delete?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    connect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    update?: ChatroomUpdateWithWhereUniqueWithoutWorkspaceInput | ChatroomUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ChatroomUpdateManyWithWhereWithoutWorkspaceInput | ChatroomUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ChatroomScalarWhereInput | ChatroomScalarWhereInput[]
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput> | WorkspaceInvitationCreateWithoutWorkspaceInput[] | WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput | WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceInvitationUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceInvitationUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceInvitationCreateManyWorkspaceInputEnvelope
    set?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    disconnect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    delete?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    connect?: WorkspaceInvitationWhereUniqueInput | WorkspaceInvitationWhereUniqueInput[]
    update?: WorkspaceInvitationUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceInvitationUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceInvitationUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceInvitationUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
  }

  export type ChatroomUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput> | ChatroomCreateWithoutWorkspaceInput[] | ChatroomUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ChatroomCreateOrConnectWithoutWorkspaceInput | ChatroomCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ChatroomUpsertWithWhereUniqueWithoutWorkspaceInput | ChatroomUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ChatroomCreateManyWorkspaceInputEnvelope
    set?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    disconnect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    delete?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    connect?: ChatroomWhereUniqueInput | ChatroomWhereUniqueInput[]
    update?: ChatroomUpdateWithWhereUniqueWithoutWorkspaceInput | ChatroomUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ChatroomUpdateManyWithWhereWithoutWorkspaceInput | ChatroomUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ChatroomScalarWhereInput | ChatroomScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<WorkspaceCreateWithoutInvitationsInput, WorkspaceUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutInvitationsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkspaceInvitationsInput = {
    create?: XOR<UserCreateWithoutWorkspaceInvitationsInput, UserUncheckedCreateWithoutWorkspaceInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutInvitationsInput, WorkspaceUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutInvitationsInput
    upsert?: WorkspaceUpsertWithoutInvitationsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutInvitationsInput, WorkspaceUpdateWithoutInvitationsInput>, WorkspaceUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutWorkspaceInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutWorkspaceInvitationsInput, UserUncheckedCreateWithoutWorkspaceInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceInvitationsInput
    upsert?: UserUpsertWithoutWorkspaceInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspaceInvitationsInput, UserUpdateWithoutWorkspaceInvitationsInput>, UserUncheckedUpdateWithoutWorkspaceInvitationsInput>
  }

  export type WorkspaceCreateNestedOneWithoutMembersInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkspaceMembersInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembersInput
    connect?: UserWhereUniqueInput
  }

  export type ChatroomMemberCreateNestedManyWithoutWorkspaceMemberInput = {
    create?: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput> | ChatroomMemberCreateWithoutWorkspaceMemberInput[] | ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput | ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput[]
    createMany?: ChatroomMemberCreateManyWorkspaceMemberInputEnvelope
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
  }

  export type NanoCreateNestedManyWithoutWriterMemberInput = {
    create?: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput> | NanoCreateWithoutWriterMemberInput[] | NanoUncheckedCreateWithoutWriterMemberInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutWriterMemberInput | NanoCreateOrConnectWithoutWriterMemberInput[]
    createMany?: NanoCreateManyWriterMemberInputEnvelope
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
  }

  export type ChatroomMemberUncheckedCreateNestedManyWithoutWorkspaceMemberInput = {
    create?: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput> | ChatroomMemberCreateWithoutWorkspaceMemberInput[] | ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput | ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput[]
    createMany?: ChatroomMemberCreateManyWorkspaceMemberInputEnvelope
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
  }

  export type NanoUncheckedCreateNestedManyWithoutWriterMemberInput = {
    create?: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput> | NanoCreateWithoutWriterMemberInput[] | NanoUncheckedCreateWithoutWriterMemberInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutWriterMemberInput | NanoCreateOrConnectWithoutWriterMemberInput[]
    createMany?: NanoCreateManyWriterMemberInputEnvelope
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
  }

  export type WorkspaceUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    upsert?: WorkspaceUpsertWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutMembersInput, WorkspaceUpdateWithoutMembersInput>, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembersInput
    upsert?: UserUpsertWithoutWorkspaceMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspaceMembersInput, UserUpdateWithoutWorkspaceMembersInput>, UserUncheckedUpdateWithoutWorkspaceMembersInput>
  }

  export type ChatroomMemberUpdateManyWithoutWorkspaceMemberNestedInput = {
    create?: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput> | ChatroomMemberCreateWithoutWorkspaceMemberInput[] | ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput | ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput[]
    upsert?: ChatroomMemberUpsertWithWhereUniqueWithoutWorkspaceMemberInput | ChatroomMemberUpsertWithWhereUniqueWithoutWorkspaceMemberInput[]
    createMany?: ChatroomMemberCreateManyWorkspaceMemberInputEnvelope
    set?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    disconnect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    delete?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    update?: ChatroomMemberUpdateWithWhereUniqueWithoutWorkspaceMemberInput | ChatroomMemberUpdateWithWhereUniqueWithoutWorkspaceMemberInput[]
    updateMany?: ChatroomMemberUpdateManyWithWhereWithoutWorkspaceMemberInput | ChatroomMemberUpdateManyWithWhereWithoutWorkspaceMemberInput[]
    deleteMany?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
  }

  export type NanoUpdateManyWithoutWriterMemberNestedInput = {
    create?: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput> | NanoCreateWithoutWriterMemberInput[] | NanoUncheckedCreateWithoutWriterMemberInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutWriterMemberInput | NanoCreateOrConnectWithoutWriterMemberInput[]
    upsert?: NanoUpsertWithWhereUniqueWithoutWriterMemberInput | NanoUpsertWithWhereUniqueWithoutWriterMemberInput[]
    createMany?: NanoCreateManyWriterMemberInputEnvelope
    set?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    disconnect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    delete?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    update?: NanoUpdateWithWhereUniqueWithoutWriterMemberInput | NanoUpdateWithWhereUniqueWithoutWriterMemberInput[]
    updateMany?: NanoUpdateManyWithWhereWithoutWriterMemberInput | NanoUpdateManyWithWhereWithoutWriterMemberInput[]
    deleteMany?: NanoScalarWhereInput | NanoScalarWhereInput[]
  }

  export type ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberNestedInput = {
    create?: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput> | ChatroomMemberCreateWithoutWorkspaceMemberInput[] | ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput | ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput[]
    upsert?: ChatroomMemberUpsertWithWhereUniqueWithoutWorkspaceMemberInput | ChatroomMemberUpsertWithWhereUniqueWithoutWorkspaceMemberInput[]
    createMany?: ChatroomMemberCreateManyWorkspaceMemberInputEnvelope
    set?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    disconnect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    delete?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    update?: ChatroomMemberUpdateWithWhereUniqueWithoutWorkspaceMemberInput | ChatroomMemberUpdateWithWhereUniqueWithoutWorkspaceMemberInput[]
    updateMany?: ChatroomMemberUpdateManyWithWhereWithoutWorkspaceMemberInput | ChatroomMemberUpdateManyWithWhereWithoutWorkspaceMemberInput[]
    deleteMany?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
  }

  export type NanoUncheckedUpdateManyWithoutWriterMemberNestedInput = {
    create?: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput> | NanoCreateWithoutWriterMemberInput[] | NanoUncheckedCreateWithoutWriterMemberInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutWriterMemberInput | NanoCreateOrConnectWithoutWriterMemberInput[]
    upsert?: NanoUpsertWithWhereUniqueWithoutWriterMemberInput | NanoUpsertWithWhereUniqueWithoutWriterMemberInput[]
    createMany?: NanoCreateManyWriterMemberInputEnvelope
    set?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    disconnect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    delete?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    update?: NanoUpdateWithWhereUniqueWithoutWriterMemberInput | NanoUpdateWithWhereUniqueWithoutWriterMemberInput[]
    updateMany?: NanoUpdateManyWithWhereWithoutWriterMemberInput | NanoUpdateManyWithWhereWithoutWriterMemberInput[]
    deleteMany?: NanoScalarWhereInput | NanoScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutChatroomsInput = {
    create?: XOR<WorkspaceCreateWithoutChatroomsInput, WorkspaceUncheckedCreateWithoutChatroomsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutChatroomsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type ChatroomMemberCreateNestedManyWithoutChatroomInput = {
    create?: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput> | ChatroomMemberCreateWithoutChatroomInput[] | ChatroomMemberUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutChatroomInput | ChatroomMemberCreateOrConnectWithoutChatroomInput[]
    createMany?: ChatroomMemberCreateManyChatroomInputEnvelope
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
  }

  export type ChatMessageCreateNestedManyWithoutChatroomInput = {
    create?: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput> | ChatMessageCreateWithoutChatroomInput[] | ChatMessageUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatroomInput | ChatMessageCreateOrConnectWithoutChatroomInput[]
    createMany?: ChatMessageCreateManyChatroomInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatroomMemberUncheckedCreateNestedManyWithoutChatroomInput = {
    create?: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput> | ChatroomMemberCreateWithoutChatroomInput[] | ChatroomMemberUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutChatroomInput | ChatroomMemberCreateOrConnectWithoutChatroomInput[]
    createMany?: ChatroomMemberCreateManyChatroomInputEnvelope
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutChatroomInput = {
    create?: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput> | ChatMessageCreateWithoutChatroomInput[] | ChatMessageUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatroomInput | ChatMessageCreateOrConnectWithoutChatroomInput[]
    createMany?: ChatMessageCreateManyChatroomInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type WorkspaceUpdateOneRequiredWithoutChatroomsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutChatroomsInput, WorkspaceUncheckedCreateWithoutChatroomsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutChatroomsInput
    upsert?: WorkspaceUpsertWithoutChatroomsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutChatroomsInput, WorkspaceUpdateWithoutChatroomsInput>, WorkspaceUncheckedUpdateWithoutChatroomsInput>
  }

  export type ChatroomMemberUpdateManyWithoutChatroomNestedInput = {
    create?: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput> | ChatroomMemberCreateWithoutChatroomInput[] | ChatroomMemberUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutChatroomInput | ChatroomMemberCreateOrConnectWithoutChatroomInput[]
    upsert?: ChatroomMemberUpsertWithWhereUniqueWithoutChatroomInput | ChatroomMemberUpsertWithWhereUniqueWithoutChatroomInput[]
    createMany?: ChatroomMemberCreateManyChatroomInputEnvelope
    set?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    disconnect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    delete?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    update?: ChatroomMemberUpdateWithWhereUniqueWithoutChatroomInput | ChatroomMemberUpdateWithWhereUniqueWithoutChatroomInput[]
    updateMany?: ChatroomMemberUpdateManyWithWhereWithoutChatroomInput | ChatroomMemberUpdateManyWithWhereWithoutChatroomInput[]
    deleteMany?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
  }

  export type ChatMessageUpdateManyWithoutChatroomNestedInput = {
    create?: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput> | ChatMessageCreateWithoutChatroomInput[] | ChatMessageUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatroomInput | ChatMessageCreateOrConnectWithoutChatroomInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutChatroomInput | ChatMessageUpsertWithWhereUniqueWithoutChatroomInput[]
    createMany?: ChatMessageCreateManyChatroomInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutChatroomInput | ChatMessageUpdateWithWhereUniqueWithoutChatroomInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutChatroomInput | ChatMessageUpdateManyWithWhereWithoutChatroomInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatroomMemberUncheckedUpdateManyWithoutChatroomNestedInput = {
    create?: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput> | ChatroomMemberCreateWithoutChatroomInput[] | ChatroomMemberUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutChatroomInput | ChatroomMemberCreateOrConnectWithoutChatroomInput[]
    upsert?: ChatroomMemberUpsertWithWhereUniqueWithoutChatroomInput | ChatroomMemberUpsertWithWhereUniqueWithoutChatroomInput[]
    createMany?: ChatroomMemberCreateManyChatroomInputEnvelope
    set?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    disconnect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    delete?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    connect?: ChatroomMemberWhereUniqueInput | ChatroomMemberWhereUniqueInput[]
    update?: ChatroomMemberUpdateWithWhereUniqueWithoutChatroomInput | ChatroomMemberUpdateWithWhereUniqueWithoutChatroomInput[]
    updateMany?: ChatroomMemberUpdateManyWithWhereWithoutChatroomInput | ChatroomMemberUpdateManyWithWhereWithoutChatroomInput[]
    deleteMany?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutChatroomNestedInput = {
    create?: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput> | ChatMessageCreateWithoutChatroomInput[] | ChatMessageUncheckedCreateWithoutChatroomInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatroomInput | ChatMessageCreateOrConnectWithoutChatroomInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutChatroomInput | ChatMessageUpsertWithWhereUniqueWithoutChatroomInput[]
    createMany?: ChatMessageCreateManyChatroomInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutChatroomInput | ChatMessageUpdateWithWhereUniqueWithoutChatroomInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutChatroomInput | ChatMessageUpdateManyWithWhereWithoutChatroomInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatroomCreateNestedOneWithoutMembersInput = {
    create?: XOR<ChatroomCreateWithoutMembersInput, ChatroomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatroomCreateOrConnectWithoutMembersInput
    connect?: ChatroomWhereUniqueInput
  }

  export type WorkspaceMemberCreateNestedOneWithoutChatroomMembersInput = {
    create?: XOR<WorkspaceMemberCreateWithoutChatroomMembersInput, WorkspaceMemberUncheckedCreateWithoutChatroomMembersInput>
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutChatroomMembersInput
    connect?: WorkspaceMemberWhereUniqueInput
  }

  export type ChatMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput> | ChatMessageCreateWithoutSenderInput[] | ChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutSenderInput | ChatMessageCreateOrConnectWithoutSenderInput[]
    createMany?: ChatMessageCreateManySenderInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput> | ChatMessageCreateWithoutSenderInput[] | ChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutSenderInput | ChatMessageCreateOrConnectWithoutSenderInput[]
    createMany?: ChatMessageCreateManySenderInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatroomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ChatroomCreateWithoutMembersInput, ChatroomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatroomCreateOrConnectWithoutMembersInput
    upsert?: ChatroomUpsertWithoutMembersInput
    connect?: ChatroomWhereUniqueInput
    update?: XOR<XOR<ChatroomUpdateToOneWithWhereWithoutMembersInput, ChatroomUpdateWithoutMembersInput>, ChatroomUncheckedUpdateWithoutMembersInput>
  }

  export type WorkspaceMemberUpdateOneRequiredWithoutChatroomMembersNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutChatroomMembersInput, WorkspaceMemberUncheckedCreateWithoutChatroomMembersInput>
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutChatroomMembersInput
    upsert?: WorkspaceMemberUpsertWithoutChatroomMembersInput
    connect?: WorkspaceMemberWhereUniqueInput
    update?: XOR<XOR<WorkspaceMemberUpdateToOneWithWhereWithoutChatroomMembersInput, WorkspaceMemberUpdateWithoutChatroomMembersInput>, WorkspaceMemberUncheckedUpdateWithoutChatroomMembersInput>
  }

  export type ChatMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput> | ChatMessageCreateWithoutSenderInput[] | ChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutSenderInput | ChatMessageCreateOrConnectWithoutSenderInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutSenderInput | ChatMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: ChatMessageCreateManySenderInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutSenderInput | ChatMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutSenderInput | ChatMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput> | ChatMessageCreateWithoutSenderInput[] | ChatMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutSenderInput | ChatMessageCreateOrConnectWithoutSenderInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutSenderInput | ChatMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: ChatMessageCreateManySenderInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutSenderInput | ChatMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutSenderInput | ChatMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatroomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatroomCreateWithoutMessagesInput, ChatroomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatroomCreateOrConnectWithoutMessagesInput
    connect?: ChatroomWhereUniqueInput
  }

  export type ChatroomMemberCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatroomMemberCreateWithoutMessagesInput, ChatroomMemberUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutMessagesInput
    connect?: ChatroomMemberWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type ChatroomUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChatroomCreateWithoutMessagesInput, ChatroomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatroomCreateOrConnectWithoutMessagesInput
    upsert?: ChatroomUpsertWithoutMessagesInput
    connect?: ChatroomWhereUniqueInput
    update?: XOR<XOR<ChatroomUpdateToOneWithWhereWithoutMessagesInput, ChatroomUpdateWithoutMessagesInput>, ChatroomUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatroomMemberUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChatroomMemberCreateWithoutMessagesInput, ChatroomMemberUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatroomMemberCreateOrConnectWithoutMessagesInput
    upsert?: ChatroomMemberUpsertWithoutMessagesInput
    connect?: ChatroomMemberWhereUniqueInput
    update?: XOR<XOR<ChatroomMemberUpdateToOneWithWhereWithoutMessagesInput, ChatroomMemberUpdateWithoutMessagesInput>, ChatroomMemberUncheckedUpdateWithoutMessagesInput>
  }

  export type NanoCreateNestedOneWithoutChildrenInput = {
    create?: XOR<NanoCreateWithoutChildrenInput, NanoUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: NanoCreateOrConnectWithoutChildrenInput
    connect?: NanoWhereUniqueInput
  }

  export type NanoCreateNestedManyWithoutParentInput = {
    create?: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput> | NanoCreateWithoutParentInput[] | NanoUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutParentInput | NanoCreateOrConnectWithoutParentInput[]
    createMany?: NanoCreateManyParentInputEnvelope
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
  }

  export type WorkspaceMemberCreateNestedOneWithoutNanosInput = {
    create?: XOR<WorkspaceMemberCreateWithoutNanosInput, WorkspaceMemberUncheckedCreateWithoutNanosInput>
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutNanosInput
    connect?: WorkspaceMemberWhereUniqueInput
  }

  export type NanoHistoryCreateNestedManyWithoutNanoInput = {
    create?: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput> | NanoHistoryCreateWithoutNanoInput[] | NanoHistoryUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutNanoInput | NanoHistoryCreateOrConnectWithoutNanoInput[]
    createMany?: NanoHistoryCreateManyNanoInputEnvelope
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
  }

  export type PendingNanoCreateNestedManyWithoutNanoInput = {
    create?: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput> | PendingNanoCreateWithoutNanoInput[] | PendingNanoUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: PendingNanoCreateOrConnectWithoutNanoInput | PendingNanoCreateOrConnectWithoutNanoInput[]
    createMany?: PendingNanoCreateManyNanoInputEnvelope
    connect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
  }

  export type NanoUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput> | NanoCreateWithoutParentInput[] | NanoUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutParentInput | NanoCreateOrConnectWithoutParentInput[]
    createMany?: NanoCreateManyParentInputEnvelope
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
  }

  export type NanoHistoryUncheckedCreateNestedManyWithoutNanoInput = {
    create?: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput> | NanoHistoryCreateWithoutNanoInput[] | NanoHistoryUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutNanoInput | NanoHistoryCreateOrConnectWithoutNanoInput[]
    createMany?: NanoHistoryCreateManyNanoInputEnvelope
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
  }

  export type PendingNanoUncheckedCreateNestedManyWithoutNanoInput = {
    create?: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput> | PendingNanoCreateWithoutNanoInput[] | PendingNanoUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: PendingNanoCreateOrConnectWithoutNanoInput | PendingNanoCreateOrConnectWithoutNanoInput[]
    createMany?: PendingNanoCreateManyNanoInputEnvelope
    connect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NanoUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<NanoCreateWithoutChildrenInput, NanoUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: NanoCreateOrConnectWithoutChildrenInput
    upsert?: NanoUpsertWithoutChildrenInput
    disconnect?: NanoWhereInput | boolean
    delete?: NanoWhereInput | boolean
    connect?: NanoWhereUniqueInput
    update?: XOR<XOR<NanoUpdateToOneWithWhereWithoutChildrenInput, NanoUpdateWithoutChildrenInput>, NanoUncheckedUpdateWithoutChildrenInput>
  }

  export type NanoUpdateManyWithoutParentNestedInput = {
    create?: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput> | NanoCreateWithoutParentInput[] | NanoUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutParentInput | NanoCreateOrConnectWithoutParentInput[]
    upsert?: NanoUpsertWithWhereUniqueWithoutParentInput | NanoUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: NanoCreateManyParentInputEnvelope
    set?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    disconnect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    delete?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    update?: NanoUpdateWithWhereUniqueWithoutParentInput | NanoUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: NanoUpdateManyWithWhereWithoutParentInput | NanoUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: NanoScalarWhereInput | NanoScalarWhereInput[]
  }

  export type WorkspaceMemberUpdateOneWithoutNanosNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutNanosInput, WorkspaceMemberUncheckedCreateWithoutNanosInput>
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutNanosInput
    upsert?: WorkspaceMemberUpsertWithoutNanosInput
    disconnect?: WorkspaceMemberWhereInput | boolean
    delete?: WorkspaceMemberWhereInput | boolean
    connect?: WorkspaceMemberWhereUniqueInput
    update?: XOR<XOR<WorkspaceMemberUpdateToOneWithWhereWithoutNanosInput, WorkspaceMemberUpdateWithoutNanosInput>, WorkspaceMemberUncheckedUpdateWithoutNanosInput>
  }

  export type NanoHistoryUpdateManyWithoutNanoNestedInput = {
    create?: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput> | NanoHistoryCreateWithoutNanoInput[] | NanoHistoryUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutNanoInput | NanoHistoryCreateOrConnectWithoutNanoInput[]
    upsert?: NanoHistoryUpsertWithWhereUniqueWithoutNanoInput | NanoHistoryUpsertWithWhereUniqueWithoutNanoInput[]
    createMany?: NanoHistoryCreateManyNanoInputEnvelope
    set?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    disconnect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    delete?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    update?: NanoHistoryUpdateWithWhereUniqueWithoutNanoInput | NanoHistoryUpdateWithWhereUniqueWithoutNanoInput[]
    updateMany?: NanoHistoryUpdateManyWithWhereWithoutNanoInput | NanoHistoryUpdateManyWithWhereWithoutNanoInput[]
    deleteMany?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
  }

  export type PendingNanoUpdateManyWithoutNanoNestedInput = {
    create?: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput> | PendingNanoCreateWithoutNanoInput[] | PendingNanoUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: PendingNanoCreateOrConnectWithoutNanoInput | PendingNanoCreateOrConnectWithoutNanoInput[]
    upsert?: PendingNanoUpsertWithWhereUniqueWithoutNanoInput | PendingNanoUpsertWithWhereUniqueWithoutNanoInput[]
    createMany?: PendingNanoCreateManyNanoInputEnvelope
    set?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    disconnect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    delete?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    connect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    update?: PendingNanoUpdateWithWhereUniqueWithoutNanoInput | PendingNanoUpdateWithWhereUniqueWithoutNanoInput[]
    updateMany?: PendingNanoUpdateManyWithWhereWithoutNanoInput | PendingNanoUpdateManyWithWhereWithoutNanoInput[]
    deleteMany?: PendingNanoScalarWhereInput | PendingNanoScalarWhereInput[]
  }

  export type NanoUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput> | NanoCreateWithoutParentInput[] | NanoUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NanoCreateOrConnectWithoutParentInput | NanoCreateOrConnectWithoutParentInput[]
    upsert?: NanoUpsertWithWhereUniqueWithoutParentInput | NanoUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: NanoCreateManyParentInputEnvelope
    set?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    disconnect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    delete?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    connect?: NanoWhereUniqueInput | NanoWhereUniqueInput[]
    update?: NanoUpdateWithWhereUniqueWithoutParentInput | NanoUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: NanoUpdateManyWithWhereWithoutParentInput | NanoUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: NanoScalarWhereInput | NanoScalarWhereInput[]
  }

  export type NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput = {
    create?: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput> | NanoHistoryCreateWithoutNanoInput[] | NanoHistoryUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutNanoInput | NanoHistoryCreateOrConnectWithoutNanoInput[]
    upsert?: NanoHistoryUpsertWithWhereUniqueWithoutNanoInput | NanoHistoryUpsertWithWhereUniqueWithoutNanoInput[]
    createMany?: NanoHistoryCreateManyNanoInputEnvelope
    set?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    disconnect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    delete?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    connect?: NanoHistoryWhereUniqueInput | NanoHistoryWhereUniqueInput[]
    update?: NanoHistoryUpdateWithWhereUniqueWithoutNanoInput | NanoHistoryUpdateWithWhereUniqueWithoutNanoInput[]
    updateMany?: NanoHistoryUpdateManyWithWhereWithoutNanoInput | NanoHistoryUpdateManyWithWhereWithoutNanoInput[]
    deleteMany?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
  }

  export type PendingNanoUncheckedUpdateManyWithoutNanoNestedInput = {
    create?: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput> | PendingNanoCreateWithoutNanoInput[] | PendingNanoUncheckedCreateWithoutNanoInput[]
    connectOrCreate?: PendingNanoCreateOrConnectWithoutNanoInput | PendingNanoCreateOrConnectWithoutNanoInput[]
    upsert?: PendingNanoUpsertWithWhereUniqueWithoutNanoInput | PendingNanoUpsertWithWhereUniqueWithoutNanoInput[]
    createMany?: PendingNanoCreateManyNanoInputEnvelope
    set?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    disconnect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    delete?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    connect?: PendingNanoWhereUniqueInput | PendingNanoWhereUniqueInput[]
    update?: PendingNanoUpdateWithWhereUniqueWithoutNanoInput | PendingNanoUpdateWithWhereUniqueWithoutNanoInput[]
    updateMany?: PendingNanoUpdateManyWithWhereWithoutNanoInput | PendingNanoUpdateManyWithWhereWithoutNanoInput[]
    deleteMany?: PendingNanoScalarWhereInput | PendingNanoScalarWhereInput[]
  }

  export type NanoCreateNestedOneWithoutHistoriesInput = {
    create?: XOR<NanoCreateWithoutHistoriesInput, NanoUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: NanoCreateOrConnectWithoutHistoriesInput
    connect?: NanoWhereUniqueInput
  }

  export type ApprovalRequestCreateNestedManyWithoutHistoryInput = {
    create?: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput> | ApprovalRequestCreateWithoutHistoryInput[] | ApprovalRequestUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutHistoryInput | ApprovalRequestCreateOrConnectWithoutHistoryInput[]
    createMany?: ApprovalRequestCreateManyHistoryInputEnvelope
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutNanoHistorysInput = {
    create?: XOR<UserCreateWithoutNanoHistorysInput, UserUncheckedCreateWithoutNanoHistorysInput>
    connectOrCreate?: UserCreateOrConnectWithoutNanoHistorysInput
    connect?: UserWhereUniqueInput
  }

  export type ApprovalRequestUncheckedCreateNestedManyWithoutHistoryInput = {
    create?: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput> | ApprovalRequestCreateWithoutHistoryInput[] | ApprovalRequestUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutHistoryInput | ApprovalRequestCreateOrConnectWithoutHistoryInput[]
    createMany?: ApprovalRequestCreateManyHistoryInputEnvelope
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
  }

  export type NanoUpdateOneRequiredWithoutHistoriesNestedInput = {
    create?: XOR<NanoCreateWithoutHistoriesInput, NanoUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: NanoCreateOrConnectWithoutHistoriesInput
    upsert?: NanoUpsertWithoutHistoriesInput
    connect?: NanoWhereUniqueInput
    update?: XOR<XOR<NanoUpdateToOneWithWhereWithoutHistoriesInput, NanoUpdateWithoutHistoriesInput>, NanoUncheckedUpdateWithoutHistoriesInput>
  }

  export type ApprovalRequestUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput> | ApprovalRequestCreateWithoutHistoryInput[] | ApprovalRequestUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutHistoryInput | ApprovalRequestCreateOrConnectWithoutHistoryInput[]
    upsert?: ApprovalRequestUpsertWithWhereUniqueWithoutHistoryInput | ApprovalRequestUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: ApprovalRequestCreateManyHistoryInputEnvelope
    set?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    disconnect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    delete?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    update?: ApprovalRequestUpdateWithWhereUniqueWithoutHistoryInput | ApprovalRequestUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: ApprovalRequestUpdateManyWithWhereWithoutHistoryInput | ApprovalRequestUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
  }

  export type UserUpdateOneWithoutNanoHistorysNestedInput = {
    create?: XOR<UserCreateWithoutNanoHistorysInput, UserUncheckedCreateWithoutNanoHistorysInput>
    connectOrCreate?: UserCreateOrConnectWithoutNanoHistorysInput
    upsert?: UserUpsertWithoutNanoHistorysInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNanoHistorysInput, UserUpdateWithoutNanoHistorysInput>, UserUncheckedUpdateWithoutNanoHistorysInput>
  }

  export type ApprovalRequestUncheckedUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput> | ApprovalRequestCreateWithoutHistoryInput[] | ApprovalRequestUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutHistoryInput | ApprovalRequestCreateOrConnectWithoutHistoryInput[]
    upsert?: ApprovalRequestUpsertWithWhereUniqueWithoutHistoryInput | ApprovalRequestUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: ApprovalRequestCreateManyHistoryInputEnvelope
    set?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    disconnect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    delete?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    connect?: ApprovalRequestWhereUniqueInput | ApprovalRequestWhereUniqueInput[]
    update?: ApprovalRequestUpdateWithWhereUniqueWithoutHistoryInput | ApprovalRequestUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: ApprovalRequestUpdateManyWithWhereWithoutHistoryInput | ApprovalRequestUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
  }

  export type NanoHistoryCreateNestedOneWithoutApprovalRequestInput = {
    create?: XOR<NanoHistoryCreateWithoutApprovalRequestInput, NanoHistoryUncheckedCreateWithoutApprovalRequestInput>
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutApprovalRequestInput
    connect?: NanoHistoryWhereUniqueInput
  }

  export type PendingNanoCreateNestedOneWithoutApprovalInput = {
    create?: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
    connectOrCreate?: PendingNanoCreateOrConnectWithoutApprovalInput
    connect?: PendingNanoWhereUniqueInput
  }

  export type PendingNanoUncheckedCreateNestedOneWithoutApprovalInput = {
    create?: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
    connectOrCreate?: PendingNanoCreateOrConnectWithoutApprovalInput
    connect?: PendingNanoWhereUniqueInput
  }

  export type NanoHistoryUpdateOneRequiredWithoutApprovalRequestNestedInput = {
    create?: XOR<NanoHistoryCreateWithoutApprovalRequestInput, NanoHistoryUncheckedCreateWithoutApprovalRequestInput>
    connectOrCreate?: NanoHistoryCreateOrConnectWithoutApprovalRequestInput
    upsert?: NanoHistoryUpsertWithoutApprovalRequestInput
    connect?: NanoHistoryWhereUniqueInput
    update?: XOR<XOR<NanoHistoryUpdateToOneWithWhereWithoutApprovalRequestInput, NanoHistoryUpdateWithoutApprovalRequestInput>, NanoHistoryUncheckedUpdateWithoutApprovalRequestInput>
  }

  export type PendingNanoUpdateOneWithoutApprovalNestedInput = {
    create?: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
    connectOrCreate?: PendingNanoCreateOrConnectWithoutApprovalInput
    upsert?: PendingNanoUpsertWithoutApprovalInput
    disconnect?: PendingNanoWhereInput | boolean
    delete?: PendingNanoWhereInput | boolean
    connect?: PendingNanoWhereUniqueInput
    update?: XOR<XOR<PendingNanoUpdateToOneWithWhereWithoutApprovalInput, PendingNanoUpdateWithoutApprovalInput>, PendingNanoUncheckedUpdateWithoutApprovalInput>
  }

  export type PendingNanoUncheckedUpdateOneWithoutApprovalNestedInput = {
    create?: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
    connectOrCreate?: PendingNanoCreateOrConnectWithoutApprovalInput
    upsert?: PendingNanoUpsertWithoutApprovalInput
    disconnect?: PendingNanoWhereInput | boolean
    delete?: PendingNanoWhereInput | boolean
    connect?: PendingNanoWhereUniqueInput
    update?: XOR<XOR<PendingNanoUpdateToOneWithWhereWithoutApprovalInput, PendingNanoUpdateWithoutApprovalInput>, PendingNanoUncheckedUpdateWithoutApprovalInput>
  }

  export type ApprovalRequestCreateNestedOneWithoutPendingNanoInput = {
    create?: XOR<ApprovalRequestCreateWithoutPendingNanoInput, ApprovalRequestUncheckedCreateWithoutPendingNanoInput>
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutPendingNanoInput
    connect?: ApprovalRequestWhereUniqueInput
  }

  export type NanoCreateNestedOneWithoutPendingNanosInput = {
    create?: XOR<NanoCreateWithoutPendingNanosInput, NanoUncheckedCreateWithoutPendingNanosInput>
    connectOrCreate?: NanoCreateOrConnectWithoutPendingNanosInput
    connect?: NanoWhereUniqueInput
  }

  export type ApprovalRequestUpdateOneRequiredWithoutPendingNanoNestedInput = {
    create?: XOR<ApprovalRequestCreateWithoutPendingNanoInput, ApprovalRequestUncheckedCreateWithoutPendingNanoInput>
    connectOrCreate?: ApprovalRequestCreateOrConnectWithoutPendingNanoInput
    upsert?: ApprovalRequestUpsertWithoutPendingNanoInput
    connect?: ApprovalRequestWhereUniqueInput
    update?: XOR<XOR<ApprovalRequestUpdateToOneWithWhereWithoutPendingNanoInput, ApprovalRequestUpdateWithoutPendingNanoInput>, ApprovalRequestUncheckedUpdateWithoutPendingNanoInput>
  }

  export type NanoUpdateOneWithoutPendingNanosNestedInput = {
    create?: XOR<NanoCreateWithoutPendingNanosInput, NanoUncheckedCreateWithoutPendingNanosInput>
    connectOrCreate?: NanoCreateOrConnectWithoutPendingNanosInput
    upsert?: NanoUpsertWithoutPendingNanosInput
    disconnect?: NanoWhereInput | boolean
    delete?: NanoWhereInput | boolean
    connect?: NanoWhereUniqueInput
    update?: XOR<XOR<NanoUpdateToOneWithWhereWithoutPendingNanosInput, NanoUpdateWithoutPendingNanosInput>, NanoUncheckedUpdateWithoutPendingNanosInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserPreferenceCreateWithoutUserInput = {
    language?: string | null
    theme?: string | null
    timezone?: string | null
  }

  export type UserPreferenceUncheckedCreateWithoutUserInput = {
    language?: string | null
    theme?: string | null
    timezone?: string | null
  }

  export type UserPreferenceCreateOrConnectWithoutUserInput = {
    where: UserPreferenceWhereUniqueInput
    create: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberCreateWithoutUserInput = {
    role?: string | null
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
    chatroomMembers?: ChatroomMemberCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutUserInput = {
    workspaceId: string
    role?: string | null
    joinedAt?: Date | string
    chatroomMembers?: ChatroomMemberUncheckedCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoUncheckedCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberCreateOrConnectWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberCreateManyUserInputEnvelope = {
    data: WorkspaceMemberCreateManyUserInput | WorkspaceMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceInvitationCreateWithoutInviterInput = {
    id?: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    workspace: WorkspaceCreateNestedOneWithoutInvitationsInput
  }

  export type WorkspaceInvitationUncheckedCreateWithoutInviterInput = {
    id?: string
    workspaceId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type WorkspaceInvitationCreateOrConnectWithoutInviterInput = {
    where: WorkspaceInvitationWhereUniqueInput
    create: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput>
  }

  export type WorkspaceInvitationCreateManyInviterInputEnvelope = {
    data: WorkspaceInvitationCreateManyInviterInput | WorkspaceInvitationCreateManyInviterInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NanoHistoryCreateWithoutWriterInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nano: NanoCreateNestedOneWithoutHistoriesInput
    approvalRequest?: ApprovalRequestCreateNestedManyWithoutHistoryInput
  }

  export type NanoHistoryUncheckedCreateWithoutWriterInput = {
    id?: string
    nanoId: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type NanoHistoryCreateOrConnectWithoutWriterInput = {
    where: NanoHistoryWhereUniqueInput
    create: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput>
  }

  export type NanoHistoryCreateManyWriterInputEnvelope = {
    data: NanoHistoryCreateManyWriterInput | NanoHistoryCreateManyWriterInput[]
    skipDuplicates?: boolean
  }

  export type UserPreferenceUpsertWithoutUserInput = {
    update: XOR<UserPreferenceUpdateWithoutUserInput, UserPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
    where?: UserPreferenceWhereInput
  }

  export type UserPreferenceUpdateToOneWithWhereWithoutUserInput = {
    where?: UserPreferenceWhereInput
    data: XOR<UserPreferenceUpdateWithoutUserInput, UserPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type UserPreferenceUpdateWithoutUserInput = {
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserPreferenceUncheckedUpdateWithoutUserInput = {
    language?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutUserInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkspaceMemberScalarWhereInput = {
    AND?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    OR?: WorkspaceMemberScalarWhereInput[]
    NOT?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: StringNullableFilter<"WorkspaceMember"> | string | null
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
  }

  export type WorkspaceInvitationUpsertWithWhereUniqueWithoutInviterInput = {
    where: WorkspaceInvitationWhereUniqueInput
    update: XOR<WorkspaceInvitationUpdateWithoutInviterInput, WorkspaceInvitationUncheckedUpdateWithoutInviterInput>
    create: XOR<WorkspaceInvitationCreateWithoutInviterInput, WorkspaceInvitationUncheckedCreateWithoutInviterInput>
  }

  export type WorkspaceInvitationUpdateWithWhereUniqueWithoutInviterInput = {
    where: WorkspaceInvitationWhereUniqueInput
    data: XOR<WorkspaceInvitationUpdateWithoutInviterInput, WorkspaceInvitationUncheckedUpdateWithoutInviterInput>
  }

  export type WorkspaceInvitationUpdateManyWithWhereWithoutInviterInput = {
    where: WorkspaceInvitationScalarWhereInput
    data: XOR<WorkspaceInvitationUpdateManyMutationInput, WorkspaceInvitationUncheckedUpdateManyWithoutInviterInput>
  }

  export type WorkspaceInvitationScalarWhereInput = {
    AND?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
    OR?: WorkspaceInvitationScalarWhereInput[]
    NOT?: WorkspaceInvitationScalarWhereInput | WorkspaceInvitationScalarWhereInput[]
    id?: StringFilter<"WorkspaceInvitation"> | string
    workspaceId?: StringFilter<"WorkspaceInvitation"> | string
    inviterId?: StringFilter<"WorkspaceInvitation"> | string
    targetEmail?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    invitation?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    token?: StringFilter<"WorkspaceInvitation"> | string
    status?: StringNullableFilter<"WorkspaceInvitation"> | string | null
    createdAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
    expiresAt?: DateTimeFilter<"WorkspaceInvitation"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    hashedToken?: StringFilter<"RefreshToken"> | string
    jti?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type NanoHistoryUpsertWithWhereUniqueWithoutWriterInput = {
    where: NanoHistoryWhereUniqueInput
    update: XOR<NanoHistoryUpdateWithoutWriterInput, NanoHistoryUncheckedUpdateWithoutWriterInput>
    create: XOR<NanoHistoryCreateWithoutWriterInput, NanoHistoryUncheckedCreateWithoutWriterInput>
  }

  export type NanoHistoryUpdateWithWhereUniqueWithoutWriterInput = {
    where: NanoHistoryWhereUniqueInput
    data: XOR<NanoHistoryUpdateWithoutWriterInput, NanoHistoryUncheckedUpdateWithoutWriterInput>
  }

  export type NanoHistoryUpdateManyWithWhereWithoutWriterInput = {
    where: NanoHistoryScalarWhereInput
    data: XOR<NanoHistoryUpdateManyMutationInput, NanoHistoryUncheckedUpdateManyWithoutWriterInput>
  }

  export type NanoHistoryScalarWhereInput = {
    AND?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
    OR?: NanoHistoryScalarWhereInput[]
    NOT?: NanoHistoryScalarWhereInput | NanoHistoryScalarWhereInput[]
    id?: StringFilter<"NanoHistory"> | string
    nanoId?: StringFilter<"NanoHistory"> | string
    version?: StringNullableFilter<"NanoHistory"> | string | null
    title?: StringNullableFilter<"NanoHistory"> | string | null
    content?: JsonNullableFilter<"NanoHistory">
    writerId?: StringNullableFilter<"NanoHistory"> | string | null
    workspaceId?: StringFilter<"NanoHistory"> | string
    createdAt?: DateTimeFilter<"NanoHistory"> | Date | string
    updatedAt?: DateTimeFilter<"NanoHistory"> | Date | string
  }

  export type UserCreateWithoutPreferenceInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryCreateNestedManyWithoutWriterInput
  }

  export type UserUncheckedCreateWithoutPreferenceInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryUncheckedCreateNestedManyWithoutWriterInput
  }

  export type UserCreateOrConnectWithoutPreferenceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPreferenceInput, UserUncheckedCreateWithoutPreferenceInput>
  }

  export type UserUpsertWithoutPreferenceInput = {
    update: XOR<UserUpdateWithoutPreferenceInput, UserUncheckedUpdateWithoutPreferenceInput>
    create: XOR<UserCreateWithoutPreferenceInput, UserUncheckedCreateWithoutPreferenceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPreferenceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPreferenceInput, UserUncheckedUpdateWithoutPreferenceInput>
  }

  export type UserUpdateWithoutPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUpdateManyWithoutWriterNestedInput
  }

  export type UserUncheckedUpdateWithoutPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput
  }

  export type WorkspaceMemberCreateWithoutWorkspaceInput = {
    role?: string | null
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
    chatroomMembers?: ChatroomMemberCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutWorkspaceInput = {
    userId: string
    role?: string | null
    joinedAt?: Date | string
    chatroomMembers?: ChatroomMemberUncheckedCreateNestedManyWithoutWorkspaceMemberInput
    nanos?: NanoUncheckedCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberCreateManyWorkspaceInputEnvelope = {
    data: WorkspaceMemberCreateManyWorkspaceInput | WorkspaceMemberCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceInvitationCreateWithoutWorkspaceInput = {
    id?: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    inviter: UserCreateNestedOneWithoutWorkspaceInvitationsInput
  }

  export type WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    inviterId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type WorkspaceInvitationCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceInvitationWhereUniqueInput
    create: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceInvitationCreateManyWorkspaceInputEnvelope = {
    data: WorkspaceInvitationCreateManyWorkspaceInput | WorkspaceInvitationCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type ChatroomCreateWithoutWorkspaceInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatroomMemberCreateNestedManyWithoutChatroomInput
    messages?: ChatMessageCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatroomMemberUncheckedCreateNestedManyWithoutChatroomInput
    messages?: ChatMessageUncheckedCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomCreateOrConnectWithoutWorkspaceInput = {
    where: ChatroomWhereUniqueInput
    create: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput>
  }

  export type ChatroomCreateManyWorkspaceInputEnvelope = {
    data: ChatroomCreateManyWorkspaceInput | ChatroomCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type WorkspaceInvitationUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceInvitationWhereUniqueInput
    update: XOR<WorkspaceInvitationUpdateWithoutWorkspaceInput, WorkspaceInvitationUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceInvitationCreateWithoutWorkspaceInput, WorkspaceInvitationUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceInvitationUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceInvitationWhereUniqueInput
    data: XOR<WorkspaceInvitationUpdateWithoutWorkspaceInput, WorkspaceInvitationUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceInvitationUpdateManyWithWhereWithoutWorkspaceInput = {
    where: WorkspaceInvitationScalarWhereInput
    data: XOR<WorkspaceInvitationUpdateManyMutationInput, WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type ChatroomUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: ChatroomWhereUniqueInput
    update: XOR<ChatroomUpdateWithoutWorkspaceInput, ChatroomUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<ChatroomCreateWithoutWorkspaceInput, ChatroomUncheckedCreateWithoutWorkspaceInput>
  }

  export type ChatroomUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: ChatroomWhereUniqueInput
    data: XOR<ChatroomUpdateWithoutWorkspaceInput, ChatroomUncheckedUpdateWithoutWorkspaceInput>
  }

  export type ChatroomUpdateManyWithWhereWithoutWorkspaceInput = {
    where: ChatroomScalarWhereInput
    data: XOR<ChatroomUpdateManyMutationInput, ChatroomUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type ChatroomScalarWhereInput = {
    AND?: ChatroomScalarWhereInput | ChatroomScalarWhereInput[]
    OR?: ChatroomScalarWhereInput[]
    NOT?: ChatroomScalarWhereInput | ChatroomScalarWhereInput[]
    id?: StringFilter<"Chatroom"> | string
    workspaceId?: StringFilter<"Chatroom"> | string
    title?: StringNullableFilter<"Chatroom"> | string | null
    description?: StringNullableFilter<"Chatroom"> | string | null
    isPrivate?: BoolFilter<"Chatroom"> | boolean
    createdAt?: DateTimeFilter<"Chatroom"> | Date | string
    updatedAt?: DateTimeFilter<"Chatroom"> | Date | string
  }

  export type WorkspaceCreateWithoutInvitationsInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutInvitationsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutInvitationsInput, WorkspaceUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutWorkspaceInvitationsInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryCreateNestedManyWithoutWriterInput
  }

  export type UserUncheckedCreateWithoutWorkspaceInvitationsInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceUncheckedCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryUncheckedCreateNestedManyWithoutWriterInput
  }

  export type UserCreateOrConnectWithoutWorkspaceInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspaceInvitationsInput, UserUncheckedCreateWithoutWorkspaceInvitationsInput>
  }

  export type WorkspaceUpsertWithoutInvitationsInput = {
    update: XOR<WorkspaceUpdateWithoutInvitationsInput, WorkspaceUncheckedUpdateWithoutInvitationsInput>
    create: XOR<WorkspaceCreateWithoutInvitationsInput, WorkspaceUncheckedCreateWithoutInvitationsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutInvitationsInput, WorkspaceUncheckedUpdateWithoutInvitationsInput>
  }

  export type WorkspaceUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserUpsertWithoutWorkspaceInvitationsInput = {
    update: XOR<UserUpdateWithoutWorkspaceInvitationsInput, UserUncheckedUpdateWithoutWorkspaceInvitationsInput>
    create: XOR<UserCreateWithoutWorkspaceInvitationsInput, UserUncheckedCreateWithoutWorkspaceInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspaceInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspaceInvitationsInput, UserUncheckedUpdateWithoutWorkspaceInvitationsInput>
  }

  export type UserUpdateWithoutWorkspaceInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUpdateManyWithoutWriterNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspaceInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUncheckedUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput
  }

  export type WorkspaceCreateWithoutMembersInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    invitations?: WorkspaceInvitationCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    invitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutWorkspaceInput
    chatrooms?: ChatroomUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutMembersInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutWorkspaceMembersInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceCreateNestedOneWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryCreateNestedManyWithoutWriterInput
  }

  export type UserUncheckedCreateWithoutWorkspaceMembersInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceUncheckedCreateNestedOneWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    nanoHistorys?: NanoHistoryUncheckedCreateNestedManyWithoutWriterInput
  }

  export type UserCreateOrConnectWithoutWorkspaceMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
  }

  export type ChatroomMemberCreateWithoutWorkspaceMemberInput = {
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    chatroom: ChatroomCreateNestedOneWithoutMembersInput
    messages?: ChatMessageCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput = {
    chatroomId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberCreateOrConnectWithoutWorkspaceMemberInput = {
    where: ChatroomMemberWhereUniqueInput
    create: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput>
  }

  export type ChatroomMemberCreateManyWorkspaceMemberInputEnvelope = {
    data: ChatroomMemberCreateManyWorkspaceMemberInput | ChatroomMemberCreateManyWorkspaceMemberInput[]
    skipDuplicates?: boolean
  }

  export type NanoCreateWithoutWriterMemberInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    parent?: NanoCreateNestedOneWithoutChildrenInput
    children?: NanoCreateNestedManyWithoutParentInput
    histories?: NanoHistoryCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateWithoutWriterMemberInput = {
    id?: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoUncheckedCreateNestedManyWithoutParentInput
    histories?: NanoHistoryUncheckedCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoCreateOrConnectWithoutWriterMemberInput = {
    where: NanoWhereUniqueInput
    create: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput>
  }

  export type NanoCreateManyWriterMemberInputEnvelope = {
    data: NanoCreateManyWriterMemberInput | NanoCreateManyWriterMemberInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutMembersInput = {
    update: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutMembersInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type WorkspaceUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitations?: WorkspaceInvitationUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitations?: WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceNestedInput
    chatrooms?: ChatroomUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserUpsertWithoutWorkspaceMembersInput = {
    update: XOR<UserUpdateWithoutWorkspaceMembersInput, UserUncheckedUpdateWithoutWorkspaceMembersInput>
    create: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspaceMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspaceMembersInput, UserUncheckedUpdateWithoutWorkspaceMembersInput>
  }

  export type UserUpdateWithoutWorkspaceMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUpdateOneWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUpdateManyWithoutWriterNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspaceMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUncheckedUpdateOneWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    nanoHistorys?: NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput
  }

  export type ChatroomMemberUpsertWithWhereUniqueWithoutWorkspaceMemberInput = {
    where: ChatroomMemberWhereUniqueInput
    update: XOR<ChatroomMemberUpdateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedUpdateWithoutWorkspaceMemberInput>
    create: XOR<ChatroomMemberCreateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedCreateWithoutWorkspaceMemberInput>
  }

  export type ChatroomMemberUpdateWithWhereUniqueWithoutWorkspaceMemberInput = {
    where: ChatroomMemberWhereUniqueInput
    data: XOR<ChatroomMemberUpdateWithoutWorkspaceMemberInput, ChatroomMemberUncheckedUpdateWithoutWorkspaceMemberInput>
  }

  export type ChatroomMemberUpdateManyWithWhereWithoutWorkspaceMemberInput = {
    where: ChatroomMemberScalarWhereInput
    data: XOR<ChatroomMemberUpdateManyMutationInput, ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberInput>
  }

  export type ChatroomMemberScalarWhereInput = {
    AND?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
    OR?: ChatroomMemberScalarWhereInput[]
    NOT?: ChatroomMemberScalarWhereInput | ChatroomMemberScalarWhereInput[]
    chatroomId?: StringFilter<"ChatroomMember"> | string
    userId?: StringFilter<"ChatroomMember"> | string
    workspaceId?: StringFilter<"ChatroomMember"> | string
    role?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadMessageId?: StringNullableFilter<"ChatroomMember"> | string | null
    lastReadAt?: DateTimeNullableFilter<"ChatroomMember"> | Date | string | null
    joinedAt?: DateTimeFilter<"ChatroomMember"> | Date | string
  }

  export type NanoUpsertWithWhereUniqueWithoutWriterMemberInput = {
    where: NanoWhereUniqueInput
    update: XOR<NanoUpdateWithoutWriterMemberInput, NanoUncheckedUpdateWithoutWriterMemberInput>
    create: XOR<NanoCreateWithoutWriterMemberInput, NanoUncheckedCreateWithoutWriterMemberInput>
  }

  export type NanoUpdateWithWhereUniqueWithoutWriterMemberInput = {
    where: NanoWhereUniqueInput
    data: XOR<NanoUpdateWithoutWriterMemberInput, NanoUncheckedUpdateWithoutWriterMemberInput>
  }

  export type NanoUpdateManyWithWhereWithoutWriterMemberInput = {
    where: NanoScalarWhereInput
    data: XOR<NanoUpdateManyMutationInput, NanoUncheckedUpdateManyWithoutWriterMemberInput>
  }

  export type NanoScalarWhereInput = {
    AND?: NanoScalarWhereInput | NanoScalarWhereInput[]
    OR?: NanoScalarWhereInput[]
    NOT?: NanoScalarWhereInput | NanoScalarWhereInput[]
    id?: StringFilter<"Nano"> | string
    workspaceId?: StringFilter<"Nano"> | string
    parentNanoId?: StringNullableFilter<"Nano"> | string | null
    type?: StringNullableFilter<"Nano"> | string | null
    title?: StringNullableFilter<"Nano"> | string | null
    content?: JsonNullableFilter<"Nano">
    writerId?: StringNullableFilter<"Nano"> | string | null
    position?: FloatFilter<"Nano"> | number
    version?: IntFilter<"Nano"> | number
    createdAt?: DateTimeFilter<"Nano"> | Date | string
    updatedAt?: DateTimeFilter<"Nano"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
    parentDeletedAt?: DateTimeNullableFilter<"Nano"> | Date | string | null
  }

  export type WorkspaceCreateWithoutChatroomsInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    invitations?: WorkspaceInvitationCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutChatroomsInput = {
    id?: string
    name: string
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    invitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutChatroomsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutChatroomsInput, WorkspaceUncheckedCreateWithoutChatroomsInput>
  }

  export type ChatroomMemberCreateWithoutChatroomInput = {
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    workspaceMember: WorkspaceMemberCreateNestedOneWithoutChatroomMembersInput
    messages?: ChatMessageCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberUncheckedCreateWithoutChatroomInput = {
    userId: string
    workspaceId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type ChatroomMemberCreateOrConnectWithoutChatroomInput = {
    where: ChatroomMemberWhereUniqueInput
    create: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput>
  }

  export type ChatroomMemberCreateManyChatroomInputEnvelope = {
    data: ChatroomMemberCreateManyChatroomInput | ChatroomMemberCreateManyChatroomInput[]
    skipDuplicates?: boolean
  }

  export type ChatMessageCreateWithoutChatroomInput = {
    id?: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: ChatroomMemberCreateNestedOneWithoutMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutChatroomInput = {
    id?: string
    senderId: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutChatroomInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput>
  }

  export type ChatMessageCreateManyChatroomInputEnvelope = {
    data: ChatMessageCreateManyChatroomInput | ChatMessageCreateManyChatroomInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutChatroomsInput = {
    update: XOR<WorkspaceUpdateWithoutChatroomsInput, WorkspaceUncheckedUpdateWithoutChatroomsInput>
    create: XOR<WorkspaceCreateWithoutChatroomsInput, WorkspaceUncheckedCreateWithoutChatroomsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutChatroomsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutChatroomsInput, WorkspaceUncheckedUpdateWithoutChatroomsInput>
  }

  export type WorkspaceUpdateWithoutChatroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    invitations?: WorkspaceInvitationUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutChatroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    invitations?: WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type ChatroomMemberUpsertWithWhereUniqueWithoutChatroomInput = {
    where: ChatroomMemberWhereUniqueInput
    update: XOR<ChatroomMemberUpdateWithoutChatroomInput, ChatroomMemberUncheckedUpdateWithoutChatroomInput>
    create: XOR<ChatroomMemberCreateWithoutChatroomInput, ChatroomMemberUncheckedCreateWithoutChatroomInput>
  }

  export type ChatroomMemberUpdateWithWhereUniqueWithoutChatroomInput = {
    where: ChatroomMemberWhereUniqueInput
    data: XOR<ChatroomMemberUpdateWithoutChatroomInput, ChatroomMemberUncheckedUpdateWithoutChatroomInput>
  }

  export type ChatroomMemberUpdateManyWithWhereWithoutChatroomInput = {
    where: ChatroomMemberScalarWhereInput
    data: XOR<ChatroomMemberUpdateManyMutationInput, ChatroomMemberUncheckedUpdateManyWithoutChatroomInput>
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutChatroomInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutChatroomInput, ChatMessageUncheckedUpdateWithoutChatroomInput>
    create: XOR<ChatMessageCreateWithoutChatroomInput, ChatMessageUncheckedCreateWithoutChatroomInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutChatroomInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutChatroomInput, ChatMessageUncheckedUpdateWithoutChatroomInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutChatroomInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutChatroomInput>
  }

  export type ChatMessageScalarWhereInput = {
    AND?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    OR?: ChatMessageScalarWhereInput[]
    NOT?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    chatroomId?: StringFilter<"ChatMessage"> | string
    senderId?: StringFilter<"ChatMessage"> | string
    content?: StringFilter<"ChatMessage"> | string
    type?: StringFilter<"ChatMessage"> | string
    isEdited?: BoolNullableFilter<"ChatMessage"> | boolean | null
    isDeleted?: BoolNullableFilter<"ChatMessage"> | boolean | null
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
  }

  export type ChatroomCreateWithoutMembersInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutChatroomsInput
    messages?: ChatMessageCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomUncheckedCreateWithoutMembersInput = {
    id?: string
    workspaceId: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomCreateOrConnectWithoutMembersInput = {
    where: ChatroomWhereUniqueInput
    create: XOR<ChatroomCreateWithoutMembersInput, ChatroomUncheckedCreateWithoutMembersInput>
  }

  export type WorkspaceMemberCreateWithoutChatroomMembersInput = {
    role?: string | null
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
    nanos?: NanoCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutChatroomMembersInput = {
    workspaceId: string
    userId: string
    role?: string | null
    joinedAt?: Date | string
    nanos?: NanoUncheckedCreateNestedManyWithoutWriterMemberInput
  }

  export type WorkspaceMemberCreateOrConnectWithoutChatroomMembersInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutChatroomMembersInput, WorkspaceMemberUncheckedCreateWithoutChatroomMembersInput>
  }

  export type ChatMessageCreateWithoutSenderInput = {
    id?: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chatroom: ChatroomCreateNestedOneWithoutMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutSenderInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput>
  }

  export type ChatMessageCreateManySenderInputEnvelope = {
    data: ChatMessageCreateManySenderInput | ChatMessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type ChatroomUpsertWithoutMembersInput = {
    update: XOR<ChatroomUpdateWithoutMembersInput, ChatroomUncheckedUpdateWithoutMembersInput>
    create: XOR<ChatroomCreateWithoutMembersInput, ChatroomUncheckedCreateWithoutMembersInput>
    where?: ChatroomWhereInput
  }

  export type ChatroomUpdateToOneWithWhereWithoutMembersInput = {
    where?: ChatroomWhereInput
    data: XOR<ChatroomUpdateWithoutMembersInput, ChatroomUncheckedUpdateWithoutMembersInput>
  }

  export type ChatroomUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutChatroomsNestedInput
    messages?: ChatMessageUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutChatroomNestedInput
  }

  export type WorkspaceMemberUpsertWithoutChatroomMembersInput = {
    update: XOR<WorkspaceMemberUpdateWithoutChatroomMembersInput, WorkspaceMemberUncheckedUpdateWithoutChatroomMembersInput>
    create: XOR<WorkspaceMemberCreateWithoutChatroomMembersInput, WorkspaceMemberUncheckedCreateWithoutChatroomMembersInput>
    where?: WorkspaceMemberWhereInput
  }

  export type WorkspaceMemberUpdateToOneWithWhereWithoutChatroomMembersInput = {
    where?: WorkspaceMemberWhereInput
    data: XOR<WorkspaceMemberUpdateWithoutChatroomMembersInput, WorkspaceMemberUncheckedUpdateWithoutChatroomMembersInput>
  }

  export type WorkspaceMemberUpdateWithoutChatroomMembersInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
    nanos?: NanoUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutChatroomMembersInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nanos?: NanoUncheckedUpdateManyWithoutWriterMemberNestedInput
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutSenderInput, ChatMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<ChatMessageCreateWithoutSenderInput, ChatMessageUncheckedCreateWithoutSenderInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutSenderInput, ChatMessageUncheckedUpdateWithoutSenderInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutSenderInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type ChatroomCreateWithoutMessagesInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutChatroomsInput
    members?: ChatroomMemberCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomUncheckedCreateWithoutMessagesInput = {
    id?: string
    workspaceId: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatroomMemberUncheckedCreateNestedManyWithoutChatroomInput
  }

  export type ChatroomCreateOrConnectWithoutMessagesInput = {
    where: ChatroomWhereUniqueInput
    create: XOR<ChatroomCreateWithoutMessagesInput, ChatroomUncheckedCreateWithoutMessagesInput>
  }

  export type ChatroomMemberCreateWithoutMessagesInput = {
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
    chatroom: ChatroomCreateNestedOneWithoutMembersInput
    workspaceMember: WorkspaceMemberCreateNestedOneWithoutChatroomMembersInput
  }

  export type ChatroomMemberUncheckedCreateWithoutMessagesInput = {
    chatroomId: string
    userId: string
    workspaceId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
  }

  export type ChatroomMemberCreateOrConnectWithoutMessagesInput = {
    where: ChatroomMemberWhereUniqueInput
    create: XOR<ChatroomMemberCreateWithoutMessagesInput, ChatroomMemberUncheckedCreateWithoutMessagesInput>
  }

  export type ChatroomUpsertWithoutMessagesInput = {
    update: XOR<ChatroomUpdateWithoutMessagesInput, ChatroomUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatroomCreateWithoutMessagesInput, ChatroomUncheckedCreateWithoutMessagesInput>
    where?: ChatroomWhereInput
  }

  export type ChatroomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatroomWhereInput
    data: XOR<ChatroomUpdateWithoutMessagesInput, ChatroomUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatroomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutChatroomsNestedInput
    members?: ChatroomMemberUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatroomMemberUncheckedUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomMemberUpsertWithoutMessagesInput = {
    update: XOR<ChatroomMemberUpdateWithoutMessagesInput, ChatroomMemberUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatroomMemberCreateWithoutMessagesInput, ChatroomMemberUncheckedCreateWithoutMessagesInput>
    where?: ChatroomMemberWhereInput
  }

  export type ChatroomMemberUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatroomMemberWhereInput
    data: XOR<ChatroomMemberUpdateWithoutMessagesInput, ChatroomMemberUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatroomMemberUpdateWithoutMessagesInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroom?: ChatroomUpdateOneRequiredWithoutMembersNestedInput
    workspaceMember?: WorkspaceMemberUpdateOneRequiredWithoutChatroomMembersNestedInput
  }

  export type ChatroomMemberUncheckedUpdateWithoutMessagesInput = {
    chatroomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoCreateWithoutChildrenInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    parent?: NanoCreateNestedOneWithoutChildrenInput
    writerMember?: WorkspaceMemberCreateNestedOneWithoutNanosInput
    histories?: NanoHistoryCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateWithoutChildrenInput = {
    id?: string
    workspaceId: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    histories?: NanoHistoryUncheckedCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoCreateOrConnectWithoutChildrenInput = {
    where: NanoWhereUniqueInput
    create: XOR<NanoCreateWithoutChildrenInput, NanoUncheckedCreateWithoutChildrenInput>
  }

  export type NanoCreateWithoutParentInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoCreateNestedManyWithoutParentInput
    writerMember?: WorkspaceMemberCreateNestedOneWithoutNanosInput
    histories?: NanoHistoryCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateWithoutParentInput = {
    id?: string
    workspaceId: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoUncheckedCreateNestedManyWithoutParentInput
    histories?: NanoHistoryUncheckedCreateNestedManyWithoutNanoInput
    pendingNanos?: PendingNanoUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoCreateOrConnectWithoutParentInput = {
    where: NanoWhereUniqueInput
    create: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput>
  }

  export type NanoCreateManyParentInputEnvelope = {
    data: NanoCreateManyParentInput | NanoCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceMemberCreateWithoutNanosInput = {
    role?: string | null
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
    chatroomMembers?: ChatroomMemberCreateNestedManyWithoutWorkspaceMemberInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutNanosInput = {
    workspaceId: string
    userId: string
    role?: string | null
    joinedAt?: Date | string
    chatroomMembers?: ChatroomMemberUncheckedCreateNestedManyWithoutWorkspaceMemberInput
  }

  export type WorkspaceMemberCreateOrConnectWithoutNanosInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutNanosInput, WorkspaceMemberUncheckedCreateWithoutNanosInput>
  }

  export type NanoHistoryCreateWithoutNanoInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvalRequest?: ApprovalRequestCreateNestedManyWithoutHistoryInput
    writer?: UserCreateNestedOneWithoutNanoHistorysInput
  }

  export type NanoHistoryUncheckedCreateWithoutNanoInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvalRequest?: ApprovalRequestUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type NanoHistoryCreateOrConnectWithoutNanoInput = {
    where: NanoHistoryWhereUniqueInput
    create: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput>
  }

  export type NanoHistoryCreateManyNanoInputEnvelope = {
    data: NanoHistoryCreateManyNanoInput | NanoHistoryCreateManyNanoInput[]
    skipDuplicates?: boolean
  }

  export type PendingNanoCreateWithoutNanoInput = {
    comment?: string | null
    createdAt?: Date | string
    approval: ApprovalRequestCreateNestedOneWithoutPendingNanoInput
  }

  export type PendingNanoUncheckedCreateWithoutNanoInput = {
    approvalId: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type PendingNanoCreateOrConnectWithoutNanoInput = {
    where: PendingNanoWhereUniqueInput
    create: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput>
  }

  export type PendingNanoCreateManyNanoInputEnvelope = {
    data: PendingNanoCreateManyNanoInput | PendingNanoCreateManyNanoInput[]
    skipDuplicates?: boolean
  }

  export type NanoUpsertWithoutChildrenInput = {
    update: XOR<NanoUpdateWithoutChildrenInput, NanoUncheckedUpdateWithoutChildrenInput>
    create: XOR<NanoCreateWithoutChildrenInput, NanoUncheckedCreateWithoutChildrenInput>
    where?: NanoWhereInput
  }

  export type NanoUpdateToOneWithWhereWithoutChildrenInput = {
    where?: NanoWhereInput
    data: XOR<NanoUpdateWithoutChildrenInput, NanoUncheckedUpdateWithoutChildrenInput>
  }

  export type NanoUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: NanoUpdateOneWithoutChildrenNestedInput
    writerMember?: WorkspaceMemberUpdateOneWithoutNanosNestedInput
    histories?: NanoHistoryUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    histories?: NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type NanoUpsertWithWhereUniqueWithoutParentInput = {
    where: NanoWhereUniqueInput
    update: XOR<NanoUpdateWithoutParentInput, NanoUncheckedUpdateWithoutParentInput>
    create: XOR<NanoCreateWithoutParentInput, NanoUncheckedCreateWithoutParentInput>
  }

  export type NanoUpdateWithWhereUniqueWithoutParentInput = {
    where: NanoWhereUniqueInput
    data: XOR<NanoUpdateWithoutParentInput, NanoUncheckedUpdateWithoutParentInput>
  }

  export type NanoUpdateManyWithWhereWithoutParentInput = {
    where: NanoScalarWhereInput
    data: XOR<NanoUpdateManyMutationInput, NanoUncheckedUpdateManyWithoutParentInput>
  }

  export type WorkspaceMemberUpsertWithoutNanosInput = {
    update: XOR<WorkspaceMemberUpdateWithoutNanosInput, WorkspaceMemberUncheckedUpdateWithoutNanosInput>
    create: XOR<WorkspaceMemberCreateWithoutNanosInput, WorkspaceMemberUncheckedCreateWithoutNanosInput>
    where?: WorkspaceMemberWhereInput
  }

  export type WorkspaceMemberUpdateToOneWithWhereWithoutNanosInput = {
    where?: WorkspaceMemberWhereInput
    data: XOR<WorkspaceMemberUpdateWithoutNanosInput, WorkspaceMemberUncheckedUpdateWithoutNanosInput>
  }

  export type WorkspaceMemberUpdateWithoutNanosInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
    chatroomMembers?: ChatroomMemberUpdateManyWithoutWorkspaceMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutNanosInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroomMembers?: ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberNestedInput
  }

  export type NanoHistoryUpsertWithWhereUniqueWithoutNanoInput = {
    where: NanoHistoryWhereUniqueInput
    update: XOR<NanoHistoryUpdateWithoutNanoInput, NanoHistoryUncheckedUpdateWithoutNanoInput>
    create: XOR<NanoHistoryCreateWithoutNanoInput, NanoHistoryUncheckedCreateWithoutNanoInput>
  }

  export type NanoHistoryUpdateWithWhereUniqueWithoutNanoInput = {
    where: NanoHistoryWhereUniqueInput
    data: XOR<NanoHistoryUpdateWithoutNanoInput, NanoHistoryUncheckedUpdateWithoutNanoInput>
  }

  export type NanoHistoryUpdateManyWithWhereWithoutNanoInput = {
    where: NanoHistoryScalarWhereInput
    data: XOR<NanoHistoryUpdateManyMutationInput, NanoHistoryUncheckedUpdateManyWithoutNanoInput>
  }

  export type PendingNanoUpsertWithWhereUniqueWithoutNanoInput = {
    where: PendingNanoWhereUniqueInput
    update: XOR<PendingNanoUpdateWithoutNanoInput, PendingNanoUncheckedUpdateWithoutNanoInput>
    create: XOR<PendingNanoCreateWithoutNanoInput, PendingNanoUncheckedCreateWithoutNanoInput>
  }

  export type PendingNanoUpdateWithWhereUniqueWithoutNanoInput = {
    where: PendingNanoWhereUniqueInput
    data: XOR<PendingNanoUpdateWithoutNanoInput, PendingNanoUncheckedUpdateWithoutNanoInput>
  }

  export type PendingNanoUpdateManyWithWhereWithoutNanoInput = {
    where: PendingNanoScalarWhereInput
    data: XOR<PendingNanoUpdateManyMutationInput, PendingNanoUncheckedUpdateManyWithoutNanoInput>
  }

  export type PendingNanoScalarWhereInput = {
    AND?: PendingNanoScalarWhereInput | PendingNanoScalarWhereInput[]
    OR?: PendingNanoScalarWhereInput[]
    NOT?: PendingNanoScalarWhereInput | PendingNanoScalarWhereInput[]
    approvalId?: StringFilter<"PendingNano"> | string
    nanoId?: StringNullableFilter<"PendingNano"> | string | null
    comment?: StringNullableFilter<"PendingNano"> | string | null
    createdAt?: DateTimeFilter<"PendingNano"> | Date | string
  }

  export type NanoCreateWithoutHistoriesInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    parent?: NanoCreateNestedOneWithoutChildrenInput
    children?: NanoCreateNestedManyWithoutParentInput
    writerMember?: WorkspaceMemberCreateNestedOneWithoutNanosInput
    pendingNanos?: PendingNanoCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateWithoutHistoriesInput = {
    id?: string
    workspaceId: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoUncheckedCreateNestedManyWithoutParentInput
    pendingNanos?: PendingNanoUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoCreateOrConnectWithoutHistoriesInput = {
    where: NanoWhereUniqueInput
    create: XOR<NanoCreateWithoutHistoriesInput, NanoUncheckedCreateWithoutHistoriesInput>
  }

  export type ApprovalRequestCreateWithoutHistoryInput = {
    id?: string
    nanoId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pendingNano?: PendingNanoCreateNestedOneWithoutApprovalInput
  }

  export type ApprovalRequestUncheckedCreateWithoutHistoryInput = {
    id?: string
    nanoId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pendingNano?: PendingNanoUncheckedCreateNestedOneWithoutApprovalInput
  }

  export type ApprovalRequestCreateOrConnectWithoutHistoryInput = {
    where: ApprovalRequestWhereUniqueInput
    create: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput>
  }

  export type ApprovalRequestCreateManyHistoryInputEnvelope = {
    data: ApprovalRequestCreateManyHistoryInput | ApprovalRequestCreateManyHistoryInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutNanoHistorysInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNanoHistorysInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceUncheckedCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNanoHistorysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNanoHistorysInput, UserUncheckedCreateWithoutNanoHistorysInput>
  }

  export type NanoUpsertWithoutHistoriesInput = {
    update: XOR<NanoUpdateWithoutHistoriesInput, NanoUncheckedUpdateWithoutHistoriesInput>
    create: XOR<NanoCreateWithoutHistoriesInput, NanoUncheckedCreateWithoutHistoriesInput>
    where?: NanoWhereInput
  }

  export type NanoUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: NanoWhereInput
    data: XOR<NanoUpdateWithoutHistoriesInput, NanoUncheckedUpdateWithoutHistoriesInput>
  }

  export type NanoUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: NanoUpdateOneWithoutChildrenNestedInput
    children?: NanoUpdateManyWithoutParentNestedInput
    writerMember?: WorkspaceMemberUpdateOneWithoutNanosNestedInput
    pendingNanos?: PendingNanoUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUncheckedUpdateManyWithoutParentNestedInput
    pendingNanos?: PendingNanoUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type ApprovalRequestUpsertWithWhereUniqueWithoutHistoryInput = {
    where: ApprovalRequestWhereUniqueInput
    update: XOR<ApprovalRequestUpdateWithoutHistoryInput, ApprovalRequestUncheckedUpdateWithoutHistoryInput>
    create: XOR<ApprovalRequestCreateWithoutHistoryInput, ApprovalRequestUncheckedCreateWithoutHistoryInput>
  }

  export type ApprovalRequestUpdateWithWhereUniqueWithoutHistoryInput = {
    where: ApprovalRequestWhereUniqueInput
    data: XOR<ApprovalRequestUpdateWithoutHistoryInput, ApprovalRequestUncheckedUpdateWithoutHistoryInput>
  }

  export type ApprovalRequestUpdateManyWithWhereWithoutHistoryInput = {
    where: ApprovalRequestScalarWhereInput
    data: XOR<ApprovalRequestUpdateManyMutationInput, ApprovalRequestUncheckedUpdateManyWithoutHistoryInput>
  }

  export type ApprovalRequestScalarWhereInput = {
    AND?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
    OR?: ApprovalRequestScalarWhereInput[]
    NOT?: ApprovalRequestScalarWhereInput | ApprovalRequestScalarWhereInput[]
    id?: StringFilter<"ApprovalRequest"> | string
    nanoId?: StringFilter<"ApprovalRequest"> | string
    historyId?: StringFilter<"ApprovalRequest"> | string
    status?: StringNullableFilter<"ApprovalRequest"> | string | null
    targetVersion?: IntFilter<"ApprovalRequest"> | number
    createdAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ApprovalRequest"> | Date | string
  }

  export type UserUpsertWithoutNanoHistorysInput = {
    update: XOR<UserUpdateWithoutNanoHistorysInput, UserUncheckedUpdateWithoutNanoHistorysInput>
    create: XOR<UserCreateWithoutNanoHistorysInput, UserUncheckedCreateWithoutNanoHistorysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNanoHistorysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNanoHistorysInput, UserUncheckedUpdateWithoutNanoHistorysInput>
  }

  export type UserUpdateWithoutNanoHistorysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNanoHistorysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUncheckedUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type NanoHistoryCreateWithoutApprovalRequestInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nano: NanoCreateNestedOneWithoutHistoriesInput
    writer?: UserCreateNestedOneWithoutNanoHistorysInput
  }

  export type NanoHistoryUncheckedCreateWithoutApprovalRequestInput = {
    id?: string
    nanoId: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NanoHistoryCreateOrConnectWithoutApprovalRequestInput = {
    where: NanoHistoryWhereUniqueInput
    create: XOR<NanoHistoryCreateWithoutApprovalRequestInput, NanoHistoryUncheckedCreateWithoutApprovalRequestInput>
  }

  export type PendingNanoCreateWithoutApprovalInput = {
    comment?: string | null
    createdAt?: Date | string
    nano?: NanoCreateNestedOneWithoutPendingNanosInput
  }

  export type PendingNanoUncheckedCreateWithoutApprovalInput = {
    nanoId?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type PendingNanoCreateOrConnectWithoutApprovalInput = {
    where: PendingNanoWhereUniqueInput
    create: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
  }

  export type NanoHistoryUpsertWithoutApprovalRequestInput = {
    update: XOR<NanoHistoryUpdateWithoutApprovalRequestInput, NanoHistoryUncheckedUpdateWithoutApprovalRequestInput>
    create: XOR<NanoHistoryCreateWithoutApprovalRequestInput, NanoHistoryUncheckedCreateWithoutApprovalRequestInput>
    where?: NanoHistoryWhereInput
  }

  export type NanoHistoryUpdateToOneWithWhereWithoutApprovalRequestInput = {
    where?: NanoHistoryWhereInput
    data: XOR<NanoHistoryUpdateWithoutApprovalRequestInput, NanoHistoryUncheckedUpdateWithoutApprovalRequestInput>
  }

  export type NanoHistoryUpdateWithoutApprovalRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nano?: NanoUpdateOneRequiredWithoutHistoriesNestedInput
    writer?: UserUpdateOneWithoutNanoHistorysNestedInput
  }

  export type NanoHistoryUncheckedUpdateWithoutApprovalRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoUpsertWithoutApprovalInput = {
    update: XOR<PendingNanoUpdateWithoutApprovalInput, PendingNanoUncheckedUpdateWithoutApprovalInput>
    create: XOR<PendingNanoCreateWithoutApprovalInput, PendingNanoUncheckedCreateWithoutApprovalInput>
    where?: PendingNanoWhereInput
  }

  export type PendingNanoUpdateToOneWithWhereWithoutApprovalInput = {
    where?: PendingNanoWhereInput
    data: XOR<PendingNanoUpdateWithoutApprovalInput, PendingNanoUncheckedUpdateWithoutApprovalInput>
  }

  export type PendingNanoUpdateWithoutApprovalInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nano?: NanoUpdateOneWithoutPendingNanosNestedInput
  }

  export type PendingNanoUncheckedUpdateWithoutApprovalInput = {
    nanoId?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalRequestCreateWithoutPendingNanoInput = {
    id?: string
    nanoId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    history: NanoHistoryCreateNestedOneWithoutApprovalRequestInput
  }

  export type ApprovalRequestUncheckedCreateWithoutPendingNanoInput = {
    id?: string
    nanoId: string
    historyId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApprovalRequestCreateOrConnectWithoutPendingNanoInput = {
    where: ApprovalRequestWhereUniqueInput
    create: XOR<ApprovalRequestCreateWithoutPendingNanoInput, ApprovalRequestUncheckedCreateWithoutPendingNanoInput>
  }

  export type NanoCreateWithoutPendingNanosInput = {
    id?: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    parent?: NanoCreateNestedOneWithoutChildrenInput
    children?: NanoCreateNestedManyWithoutParentInput
    writerMember?: WorkspaceMemberCreateNestedOneWithoutNanosInput
    histories?: NanoHistoryCreateNestedManyWithoutNanoInput
  }

  export type NanoUncheckedCreateWithoutPendingNanosInput = {
    id?: string
    workspaceId: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
    children?: NanoUncheckedCreateNestedManyWithoutParentInput
    histories?: NanoHistoryUncheckedCreateNestedManyWithoutNanoInput
  }

  export type NanoCreateOrConnectWithoutPendingNanosInput = {
    where: NanoWhereUniqueInput
    create: XOR<NanoCreateWithoutPendingNanosInput, NanoUncheckedCreateWithoutPendingNanosInput>
  }

  export type ApprovalRequestUpsertWithoutPendingNanoInput = {
    update: XOR<ApprovalRequestUpdateWithoutPendingNanoInput, ApprovalRequestUncheckedUpdateWithoutPendingNanoInput>
    create: XOR<ApprovalRequestCreateWithoutPendingNanoInput, ApprovalRequestUncheckedCreateWithoutPendingNanoInput>
    where?: ApprovalRequestWhereInput
  }

  export type ApprovalRequestUpdateToOneWithWhereWithoutPendingNanoInput = {
    where?: ApprovalRequestWhereInput
    data: XOR<ApprovalRequestUpdateWithoutPendingNanoInput, ApprovalRequestUncheckedUpdateWithoutPendingNanoInput>
  }

  export type ApprovalRequestUpdateWithoutPendingNanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: NanoHistoryUpdateOneRequiredWithoutApprovalRequestNestedInput
  }

  export type ApprovalRequestUncheckedUpdateWithoutPendingNanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    historyId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoUpsertWithoutPendingNanosInput = {
    update: XOR<NanoUpdateWithoutPendingNanosInput, NanoUncheckedUpdateWithoutPendingNanosInput>
    create: XOR<NanoCreateWithoutPendingNanosInput, NanoUncheckedCreateWithoutPendingNanosInput>
    where?: NanoWhereInput
  }

  export type NanoUpdateToOneWithWhereWithoutPendingNanosInput = {
    where?: NanoWhereInput
    data: XOR<NanoUpdateWithoutPendingNanosInput, NanoUncheckedUpdateWithoutPendingNanosInput>
  }

  export type NanoUpdateWithoutPendingNanosInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: NanoUpdateOneWithoutChildrenNestedInput
    children?: NanoUpdateManyWithoutParentNestedInput
    writerMember?: WorkspaceMemberUpdateOneWithoutNanosNestedInput
    histories?: NanoHistoryUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateWithoutPendingNanosInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUncheckedUpdateManyWithoutParentNestedInput
    histories?: NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationCreateNestedManyWithoutInviterInput
    nanoHistorys?: NanoHistoryCreateNestedManyWithoutWriterInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email?: string | null
    password?: string | null
    firstName: string
    lastName?: string | null
    provider?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    preference?: UserPreferenceUncheckedCreateNestedOneWithoutUserInput
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedCreateNestedManyWithoutInviterInput
    nanoHistorys?: NanoHistoryUncheckedCreateNestedManyWithoutWriterInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUpdateManyWithoutInviterNestedInput
    nanoHistorys?: NanoHistoryUpdateManyWithoutWriterNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preference?: UserPreferenceUncheckedUpdateOneWithoutUserNestedInput
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    WorkspaceInvitations?: WorkspaceInvitationUncheckedUpdateManyWithoutInviterNestedInput
    nanoHistorys?: NanoHistoryUncheckedUpdateManyWithoutWriterNestedInput
  }

  export type WorkspaceMemberCreateManyUserInput = {
    workspaceId: string
    role?: string | null
    joinedAt?: Date | string
  }

  export type WorkspaceInvitationCreateManyInviterInput = {
    id?: string
    workspaceId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    hashedToken: string
    jti: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type NanoHistoryCreateManyWriterInput = {
    id?: string
    nanoId: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceMemberUpdateWithoutUserInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
    chatroomMembers?: ChatroomMemberUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutUserInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroomMembers?: ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUncheckedUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserInput = {
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type WorkspaceInvitationUncheckedUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationUncheckedUpdateManyWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashedToken?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoHistoryUpdateWithoutWriterInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nano?: NanoUpdateOneRequiredWithoutHistoriesNestedInput
    approvalRequest?: ApprovalRequestUpdateManyWithoutHistoryNestedInput
  }

  export type NanoHistoryUncheckedUpdateWithoutWriterInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalRequest?: ApprovalRequestUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type NanoHistoryUncheckedUpdateManyWithoutWriterInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateManyWorkspaceInput = {
    userId: string
    role?: string | null
    joinedAt?: Date | string
  }

  export type WorkspaceInvitationCreateManyWorkspaceInput = {
    id?: string
    inviterId: string
    targetEmail?: string | null
    invitation?: string | null
    token: string
    status?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type ChatroomCreateManyWorkspaceInput = {
    id?: string
    title?: string | null
    description?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceMemberUpdateWithoutWorkspaceInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
    chatroomMembers?: ChatroomMemberUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroomMembers?: ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberNestedInput
    nanos?: NanoUncheckedUpdateManyWithoutWriterMemberNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutWorkspaceInvitationsNestedInput
  }

  export type WorkspaceInvitationUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInvitationUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetEmail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatroomMemberUpdateManyWithoutChatroomNestedInput
    messages?: ChatMessageUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatroomMemberUncheckedUpdateManyWithoutChatroomNestedInput
    messages?: ChatMessageUncheckedUpdateManyWithoutChatroomNestedInput
  }

  export type ChatroomUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatroomMemberCreateManyWorkspaceMemberInput = {
    chatroomId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
  }

  export type NanoCreateManyWriterMemberInput = {
    id?: string
    parentNanoId?: string | null
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
  }

  export type ChatroomMemberUpdateWithoutWorkspaceMemberInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroom?: ChatroomUpdateOneRequiredWithoutMembersNestedInput
    messages?: ChatMessageUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberUncheckedUpdateWithoutWorkspaceMemberInput = {
    chatroomId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberUncheckedUpdateManyWithoutWorkspaceMemberInput = {
    chatroomId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoUpdateWithoutWriterMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: NanoUpdateOneWithoutChildrenNestedInput
    children?: NanoUpdateManyWithoutParentNestedInput
    histories?: NanoHistoryUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateWithoutWriterMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUncheckedUpdateManyWithoutParentNestedInput
    histories?: NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateManyWithoutWriterMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentNanoId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatroomMemberCreateManyChatroomInput = {
    userId: string
    workspaceId: string
    role?: string | null
    lastReadMessageId?: string | null
    lastReadAt?: Date | string | null
    joinedAt?: Date | string
  }

  export type ChatMessageCreateManyChatroomInput = {
    id?: string
    senderId: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatroomMemberUpdateWithoutChatroomInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMember?: WorkspaceMemberUpdateOneRequiredWithoutChatroomMembersNestedInput
    messages?: ChatMessageUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberUncheckedUpdateWithoutChatroomInput = {
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChatroomMemberUncheckedUpdateManyWithoutChatroomInput = {
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastReadAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUpdateWithoutChatroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: ChatroomMemberUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutChatroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutChatroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateManySenderInput = {
    id?: string
    content: string
    type: string
    isEdited?: boolean | null
    isDeleted?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatroom?: ChatroomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isEdited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NanoCreateManyParentInput = {
    id?: string
    workspaceId: string
    type?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    position?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    parentDeletedAt?: Date | string | null
  }

  export type NanoHistoryCreateManyNanoInput = {
    id?: string
    version?: string | null
    title?: string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: string | null
    workspaceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingNanoCreateManyNanoInput = {
    approvalId: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type NanoUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUpdateManyWithoutParentNestedInput
    writerMember?: WorkspaceMemberUpdateOneWithoutNanosNestedInput
    histories?: NanoHistoryUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: NanoUncheckedUpdateManyWithoutParentNestedInput
    histories?: NanoHistoryUncheckedUpdateManyWithoutNanoNestedInput
    pendingNanos?: PendingNanoUncheckedUpdateManyWithoutNanoNestedInput
  }

  export type NanoUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: FloatFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentDeletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NanoHistoryUpdateWithoutNanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalRequest?: ApprovalRequestUpdateManyWithoutHistoryNestedInput
    writer?: UserUpdateOneWithoutNanoHistorysNestedInput
  }

  export type NanoHistoryUncheckedUpdateWithoutNanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvalRequest?: ApprovalRequestUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type NanoHistoryUncheckedUpdateManyWithoutNanoInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableJsonNullValueInput | InputJsonValue
    writerId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoUpdateWithoutNanoInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approval?: ApprovalRequestUpdateOneRequiredWithoutPendingNanoNestedInput
  }

  export type PendingNanoUncheckedUpdateWithoutNanoInput = {
    approvalId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNanoUncheckedUpdateManyWithoutNanoInput = {
    approvalId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalRequestCreateManyHistoryInput = {
    id?: string
    nanoId: string
    status?: string | null
    targetVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApprovalRequestUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pendingNano?: PendingNanoUpdateOneWithoutApprovalNestedInput
  }

  export type ApprovalRequestUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pendingNano?: PendingNanoUncheckedUpdateOneWithoutApprovalNestedInput
  }

  export type ApprovalRequestUncheckedUpdateManyWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nanoId?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    targetVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}