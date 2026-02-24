---
title: "My second blog post (wow) (wow)"
subtitle: "Another cool subtitle"
date: "2026-02-24"
---

This is my second blog post. This is mainly here to test how multiple posts are rendered. Do you 
think it looks good? I hope it does. I'm still learning how to use mdsvex, but I'm having fun with it!

```cpp title="src/main.cpp" showLineNumbers 

#include <iostream>
using namespace std;

// test cpp program to see if code blocks work in mdsvex 

int main() {

  for (int i = 0; i < 5; i++)
    cout << "Hello, world! ";
}

```

```ts title="path/to/file.ts" showLineNumbers {2,4}
const greet = (name: string) => `hello, ${name}`;
const value = greet("world");
console.log(value);
```
