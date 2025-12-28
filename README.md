### Problems I faced while deploying the website

-   dependency version mismatches in Auth.js and prisma adapter. I fixed it using npm overrides to dedupe @auth/core in package.json file

```
 "overrides": {
         "@auth/core": "0.41.1"
    }
```

-   giftSuggestions is typed as any[] in [..boardId/page.tsx]

```
    const giftSuggestions: Gift[] = await getGiftSuggestions({ boardId });
```

-   added serverAction type

```
type formState = {
    success: boolean, message: string
}
export type ServerActionType = (
    prevState: formState, formData: FormData
) => Promise<formState>;
```
