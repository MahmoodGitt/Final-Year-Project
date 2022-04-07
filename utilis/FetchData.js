import React from 'react';
// Firebase database services
import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();

export default db;
