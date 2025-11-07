# Example structure of main components in a project

## Page

```tsx
import React from "react";
import MyComponent from "../components/MyComponent";
import useGreeting from "../hooks/useGreeting";

const HomePage: React.FC = () => {
  const greeting = useGreeting("Helder");
  return (
    <div>
      <h1>{greeting}</h1>
      <MyComponent />
    </div>
  );
};

export default HomePage;
```

## Component

```tsx
import React from "react";

const MyComponent: React.FC = () => (
  <button>Click Me!</button>
);

export default MyComponent;
```

## Hook

```tsx
import { useState, useEffect } from "react";
const useGreeting = (name: string): string => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(`Hello, ${name}! Welcome to my site.`);
  }, [name]);

  return greeting;
};
export default useGreeting;
```