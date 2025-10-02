'use client';

import { useState } from 'react';
import CodeEditor from './components/CodeSandbox';

export default function Home() {


  return (
    <main className="min-h-screen bg-zinc-900">

      <CodeEditor />

    </main>
  );
}