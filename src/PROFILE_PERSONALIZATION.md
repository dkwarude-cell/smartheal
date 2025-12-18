# 🎯 Profile Personalization System

## Overview

SmartHeal now features a comprehensive profile personalization system that customizes the entire app experience based on user type, experience level, and goals.

---

## 🔄 New Authentication Flow

### Updated User Journey:
1. **Start Screen** → Get Started
2. **Login/Signup** → Enter credentials
3. **OTP Verification** → Verify phone number
4. **🆕 Profile Type Selection** → Choose user type
5. **🆕 Profile Details** → Select level/age group & goals
6. **🆕 Interests Selection** → Choose features & focus area
7. **Profile Setup** → Complete basic info
8. **Welcome Screen** → Introduction
9. **Device Connection** → Pair ITT device
10. **Main App** → Personalized experience

---

## 👥 User Profile Types

### 1. Runner / Athlete 🏃
**Target Users:** Athletes, runners, sports enthusiasts

**Profile Details Collected:**
- Experience Level:
  - Beginner (New to running or returning after a break)
  - Intermediate (Regular runner, 3-5 times per week)
  - Advanced (Experienced runner, training for competitions)
  - Professional (Elite athlete or serious competitor)

**Interest Options:**
- Recovery Therapy (Post-workout recovery and injury prevention)
- Performance Enhancement (Optimize training and competition results)
- Training Plans (Structured workout programs)
- Performance Analytics (Track metrics and progress)

**Focus Areas:**
- Recovery Focused (Prioritize muscle recovery and injury prevention)
- Performance Focused (Maximize athletic performance and results)
- Balanced Approach (Equal focus on recovery and performance)

**Customized Home Screen Features:**
- Weekly performance stats (distance, pace, active days)
- Recovery score tracking
- Quick access to recovery sessions
- Upcoming therapy schedule
- Performance metrics dashboard

---

### 2. Coach / Trainer 👨‍🏫
**Target Users:** Personal trainers, sports coaches, rehab specialists

**Profile Details Collected:**
- Coach Type:
  - Personal Trainer (One-on-one client training)
  - Sports Coach (Team or individual sports coaching)
  - Team Coach (Managing multiple athletes)
  - Rehabilitation Specialist (Recovery and injury prevention)

**Interest Options:**
- Client Management (Manage multiple athletes/clients)
- Therapy Protocols (Treatment and recovery plans)
- Progress Tracking (Monitor client improvements)
- AI Insights (Smart recommendations for clients)

**Focus Areas:**
- Individual Clients (Focus on one-on-one coaching)
- Team Management (Manage groups and teams)
- Both (Individual and team coaching)

**Customized Home Screen Features:**
- Active client count and overview
- Client status dashboard with progress indicators
- Today's session schedule
- Pending reviews and notifications
- Client progress tracking
- Average client improvement metrics

---

### 3. Health & Wellness ❤️
**Target Users:** General health-focused users, pain management, mobility improvement

**Profile Details Collected:**
- Age Group:
  - 18-30 years (Young adult)
  - 31-45 years (Adult)
  - 46-60 years (Mature adult)
  - 60+ years (Senior)
  
- Primary Goal:
  - Pain Management (Chronic pain relief)
  - Improve Mobility (Better movement and flexibility)
  - Post-Injury Recovery (Rehabilitation support)
  - General Wellness (Overall health improvement)

**Interest Options:**
- Therapy Sessions (Guided pain relief and wellness)
- Wellness Tracking (Daily health monitoring)
- Guided Programs (Step-by-step treatment plans)
- Health Education (Learn about your condition)

**Focus Areas:**
- Pain Relief (Primary focus on reducing pain)
- Mobility Improvement (Enhance movement and flexibility)
- Holistic Wellness (Overall health improvement)

**Customized Home Screen Features:**
- Pain level tracking (with trend indicators)
- Mobility score
- Wellness check-in dashboard
- Daily wellness plan with task checklist
- Recommended therapy programs with progress
- Educational tips and guidance
- Treatment day counter

---

## 🎨 UI Personalization

### Consistent Design System
All profile types share the **same SmartHeal brand identity**:
- **Color Scheme:** Red/Orange gradients (red-500 to orange-500)
- **Background:** Gray-50 or white cards with subtle shadows
- **Accent Color:** Red-500 for primary actions and highlights
- **Typography:** Consistent font sizes and weights across all screens
- **Spacing:** Uniform padding, margins, and card layouts

### Content Personalization
While the UI remains consistent, **content is customized** for each profile type:

#### Athlete Interface
- **Metrics:** Distance, pace, recovery score, active days
- **Terminology:** Sessions, performance, training, recovery
- **Quick Actions:** Start Recovery, View Training Plan
- **Dashboard Focus:** Performance tracking and recovery optimization

#### Coach Interface
- **Metrics:** Client count, sessions today, progress averages
- **Terminology:** Clients, protocols, progress, monitoring
- **Quick Actions:** View Schedule, Client Management
- **Dashboard Focus:** Client management and session scheduling
- **Special Features:** Client status alerts, pending reviews

#### Health & Wellness Interface
- **Metrics:** Pain level, mobility score, well-being, treatment days
- **Terminology:** Wellness, comfort, improvement, care
- **Quick Actions:** Start Therapy, Continue Program
- **Dashboard Focus:** Wellness tracking and guided programs
- **Special Features:** Daily checklist, educational tips

---

## 📊 Data Structure

### User Profile Object:
```typescript
interface User {
  name: string;
  email: string;
  phone: string;
  age?: number;
  weight?: number;
  height?: number;
  medicalConditions?: string[];
  
  // New personalization fields
  profileType?: 'athlete' | 'coach' | 'health';
  level?: string; // Experience level, coach type, or age group
  goal?: string; // Primary goal (for health profile)
  interests?: string[]; // Selected features and focus area
}
```

---

## 🔧 Implementation Files

### New Components:
1. `/components/profile-type-selection-screen.tsx`
   - Displays 3 profile type cards
   - Animated selection with visual feedback
   - Saves profileType to user data

2. `/components/profile-details-screen.tsx`
   - Dynamic options based on profile type
   - Conditional secondary questions (age + goal for health users)
   - Saves level and goal to user data

3. `/components/interests-selection-screen.tsx`
   - Multi-select for features
   - Single-select for primary focus
   - Saves interests array to user data

4. `/components/athlete-home-screen.tsx`
   - Performance-focused dashboard
   - Stats cards with gradients
   - Training and recovery metrics

5. `/components/coach-home-screen.tsx`
   - Client management dashboard
   - Session schedule
   - Progress monitoring

6. `/components/health-home-screen.tsx`
   - Wellness-focused dashboard
   - Pain and mobility tracking
   - Guided programs with progress

### Modified Files:
- `/App.tsx` - Added new states and screens to flow
- `/components/otp-screen.tsx` - Navigate to profile-type instead of profile-setup
- `/components/main-app.tsx` - Render custom home screen based on profileType

---

## 🎯 Benefits

### For Users:
✅ Personalized experience from day one
✅ Relevant features and terminology
✅ Appropriate metrics for their goals
✅ Reduced cognitive load (only see what matters)
✅ Better engagement and retention

### For Business:
✅ Higher user satisfaction
✅ Better product-market fit
✅ Targeted feature development
✅ User segmentation for analytics
✅ Upsell opportunities based on profile

---

## 🚀 Future Enhancements

### Planned Features:
1. **Role-Based Feature Access**
   - Hide/show tabs based on profile type
   - Coach-only features (client management)
   - Athlete-only features (competition tracking)

2. **Advanced Personalization**
   - ML-based recommendations
   - Adaptive UI based on usage patterns
   - Customizable dashboards

3. **Profile Switching**
   - Allow users to have multiple profiles
   - Quick switch between roles (e.g., athlete + coach)

4. **Analytics & Insights**
   - Profile-specific analytics
   - Comparative benchmarks within same profile type
   - Goal achievement tracking

5. **Community Features**
   - Connect with similar profile types
   - Share protocols (coaches)
   - Training groups (athletes)

---

## 📱 Testing the Flow

### To Test Profile Selection:
1. Start the app
2. Click "Get Started"
3. Choose "Sign Up" or "Login"
4. Enter credentials and verify OTP
5. **NEW:** Select profile type (Athlete/Coach/Health)
6. **NEW:** Choose level/age group and goal
7. **NEW:** Select interested features and focus
8. Complete profile setup
9. See personalized home screen

### Test Each Profile Type:
- **Athlete:** Check performance metrics, recovery tracking
- **Coach:** Verify client management features, schedule view
- **Health:** Confirm wellness tracking, pain monitoring

---

## 🔒 Settings Integration

Users can change their profile type and preferences in:
- **Settings → Profile Settings**
- Access to re-run profile selection
- Update interests and focus areas
- Immediately see UI changes

---

## 📊 Analytics Events (Future)

Track these events for insights:
- `profile_type_selected` - Which type users choose
- `profile_details_completed` - Completion rate
- `interests_selected` - Popular feature combinations
- `home_screen_engagement` - Interaction with personalized UI
- `profile_change` - Users switching profiles

---

## 💡 Best Practices

### For Developers:
1. Always check `user.profileType` before rendering UI
2. Use fallback for users without profile type
3. Test all three profile paths
4. Keep personalization data in user context
5. Update React Native version with same logic

### For Designers:
1. Maintain consistent spacing across profile types
2. Use appropriate color gradients for each type
3. Keep terminology user-centric
4. Ensure readability in all themes
5. Design for scalability (more profile types in future)

---

## 🔄 Migration Plan

### For Existing Users:
- Show profile selection on next login
- Offer "Complete Your Profile" prompt
- Allow "Skip for Now" with default experience
- Track completion rate

### Data Migration:
- Existing users get `profileType: null`
- App shows default HomeTab if no profileType
- Encourage profile completion with incentives

---

## ✅ Checklist

### Completed:
- [x] Profile type selection screen
- [x] Profile details collection
- [x] Interests selection
- [x] Three custom home screens
- [x] Integration with auth flow
- [x] User data structure update
- [x] MainApp personalization logic

### Next Steps:
- [ ] Add to React Native version (/rn-app/)
- [ ] Implement settings for profile changes
- [ ] Add analytics tracking
- [ ] Create profile-based feature gating
- [ ] Build coach client management features
- [ ] Develop athlete training plans
- [ ] Design health wellness programs

---

**Last Updated:** December 17, 2025  
**Version:** 1.0  
**Status:** ✅ Completed for Web Preview

---

Made with ❤️ for SmartHeal by Runverve