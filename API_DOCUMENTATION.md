# Video AI API Documentation

## 개요
이 문서는 Video AI 애플리케이션에 필요한 백엔드 API 엔드포인트와 JSON 응답 형식을 정의합니다.

---

## 1. 비디오 업로드 API

### POST `/api/videos/upload`

원본 비디오를 업로드하고 AI 분석을 시작합니다.

**Request:**
```http
POST /api/videos/upload
Content-Type: multipart/form-data

{
  "file": <video file>,
  "userId": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "videoId": "uuid",
    "status": "processing",
    "uploadedAt": "2025-01-15T10:30:00Z",
    "estimatedProcessingTime": 300
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "UPLOAD_FAILED",
    "message": "파일 업로드에 실패했습니다."
  }
}
```

---

## 2. 비디오 분석 결과 조회 API

### GET `/api/videos/{videoId}/results`

업로드한 비디오의 AI 분석 결과를 조회합니다.

**Request:**
```http
GET /api/videos/{videoId}/results
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": {
      "title": "Sample Video",
      "filename": "sample_video.mp4",
      "duration": "10:30",
      "uploadDate": "2025-01-15",
      "fileSize": "125 MB",
      "resolution": "1920x1080",
      "fps": 30,
      "videoUrl": "https://s3.amazonaws.com/bucket-name/original/video_id.mp4"
    },
    "analysis": {
      "processedDate": "2025-01-15",
      "totalHighlights": 4,
      "averageScore": 90,
      "processingTime": 285
    },
    "highlights": [
      {
        "time": "0:45",
        "score": 95,
        "type": "Action Peak",
        "color": "bg-accent"
      },
      {
        "time": "2:30",
        "score": 88,
        "type": "Emotional",
        "color": "bg-primary"
      }
    ],
    "generatedClips": [
      {
        "id": 1,
        "title": "Epic Action Sequence",
        "startTime": "0:38",
        "endTime": "0:53",
        "duration": "0:15",
        "score": 95,
        "category": "action",
        "platform": "",
        "views": "2.4M",
        "engagement": "12.5%",
        "videoUrl": "https://s3.amazonaws.com/bucket-name/clips/clip_1.mp4"
      }
    ]
  }
}
```

**Processing Status Response:**
```json
{
  "success": true,
  "data": {
    "status": "processing",
    "progress": 45,
    "message": "AI 분석 중..."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VIDEO_NOT_FOUND",
    "message": "비디오를 찾을 수 없습니다."
  }
}
```

---

## 3. 클립 편집 저장 API

### POST `/api/clips/{clipId}/edit`

편집된 클립 정보를 저장합니다.

**Request:**
```http
POST /api/clips/{clipId}/edit
Content-Type: application/json

{
  "clipId": "1",
  "title": "수정된 제목",
  "playbackSpeed": 1.5,
  "aspectRatio": "9:16",
  "trimStart": 10.5,
  "trimEnd": 95.2,
  "subtitles": [
    {
      "id": "subtitle_1",
      "text": "자막 텍스트",
      "x": 50,
      "y": 80,
      "fontSize": 16,
      "startTime": 2.0,
      "endTime": 5.0
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clipId": "1",
    "savedAt": "2025-01-15T11:00:00Z",
    "message": "편집 내용이 저장되었습니다."
  }
}
```

---

## 4. 편집된 클립 내보내기 API

### POST `/api/clips/{clipId}/export`

편집된 설정을 적용하여 최종 비디오를 생성하고 다운로드 URL을 반환합니다.

**Request:**
```http
POST /api/clips/{clipId}/export
Content-Type: application/json

{
  "clipId": "1",
  "title": "최종 제목",
  "playbackSpeed": 1.5,
  "aspectRatio": "9:16",
  "trimStart": 10.5,
  "trimEnd": 95.2,
  "subtitles": [
    {
      "id": "subtitle_1",
      "text": "자막 텍스트",
      "x": 50,
      "y": 80,
      "fontSize": 16,
      "startTime": 2.0,
      "endTime": 5.0
    }
  ],
  "format": "mp4",
  "quality": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_uuid",
    "status": "processing",
    "estimatedTime": 120,
    "message": "비디오 생성 중..."
  }
}
```

**Completed Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_uuid",
    "status": "completed",
    "downloadUrl": "https://s3.amazonaws.com/bucket-name/exports/edited_clip.mp4",
    "expiresAt": "2025-01-16T11:00:00Z",
    "fileSize": "45 MB",
    "duration": "0:15"
  }
}
```

---

## 5. 내보내기 상태 확인 API

### GET `/api/exports/{exportId}/status`

비디오 내보내기 작업의 진행 상태를 확인합니다.

**Request:**
```http
GET /api/exports/{exportId}/status
```

**Response (Processing):**
```json
{
  "success": true,
  "data": {
    "exportId": "export_uuid",
    "status": "processing",
    "progress": 65,
    "currentStep": "Applying subtitles",
    "estimatedTimeRemaining": 45
  }
}
```

**Response (Completed):**
```json
{
  "success": true,
  "data": {
    "exportId": "export_uuid",
    "status": "completed",
    "downloadUrl": "https://s3.amazonaws.com/bucket-name/exports/edited_clip.mp4",
    "expiresAt": "2025-01-16T11:00:00Z",
    "fileSize": "45 MB",
    "duration": "0:15"
  }
}
```

---

## 6. 클립 다운로드 API

### GET `/api/clips/{clipId}/download`

편집된 클립을 다운로드합니다.

**Request:**
```http
GET /api/clips/{clipId}/download?exportId={exportId}
```

**Response:**
- Content-Type: `video/mp4`
- Content-Disposition: `attachment; filename="edited_clip.mp4"`
- Binary video data

---

## 데이터 타입 정의

### Original Video Object
```typescript
interface OriginalVideo {
  title: string;
  filename: string;
  duration: string; // "MM:SS" format
  uploadDate: string; // "YYYY-MM-DD" format
  fileSize: string;
  resolution: string; // "WIDTHxHEIGHT" format
  fps: number;
  videoUrl: string; // S3 URL
}
```

### Analysis Object
```typescript
interface Analysis {
  processedDate: string; // "YYYY-MM-DD" format
  totalHighlights: number;
  averageScore: number;
  processingTime?: number; // seconds
}
```

### Highlight Object
```typescript
interface Highlight {
  time: string; // "M:SS" format
  score: number; // 0-100
  type: string; // "Action Peak" | "Emotional" | "Dialogue" | "Visual"
  color: string; // Tailwind class
}
```

### Generated Clip Object
```typescript
interface GeneratedClip {
  id: number;
  title: string;
  startTime: string; // "M:SS" format
  endTime: string; // "M:SS" format
  duration: string; // "M:SS" format
  score: number; // 0-100
  category: string; // "action" | "emotional" | "dialogue" | "visual" | "comedy" | "suspense"
  //platform: string; // "TikTok" | "Instagram" | "YouTube"
  views: string;
  engagement: string; // percentage
  videoUrl: string; // S3 URL
}
```

### Subtitle Object
```typescript
interface Subtitle {
  id: string;
  text: string;
  x: number; // 0-100 (percentage)
  y: number; // 0-100 (percentage)
  fontSize: number; // pixels
  startTime?: number; // seconds
  endTime?: number; // seconds
}
```

### Edit Data Object
```typescript
interface EditData {
  clipId: string;
  title: string;
  playbackSpeed: number; // 0.25 - 2.0
  aspectRatio: string; // "16:9" | "4:3" | "1:1" | "4:5" | "3:4" | "9:16"
  trimStart: number; // 0-100 (percentage)
  trimEnd: number; // 0-100 (percentage)
  subtitles: Subtitle[];
}
```

---

## 에러 코드

| 코드 | 설명 |
|------|------|
| `UPLOAD_FAILED` | 파일 업로드 실패 |
| `VIDEO_NOT_FOUND` | 비디오를 찾을 수 없음 |
| `PROCESSING_FAILED` | AI 분석 실패 |
| `INVALID_VIDEO_FORMAT` | 지원하지 않는 비디오 형식 |
| `FILE_TOO_LARGE` | 파일 크기 초과 |
| `EXPORT_FAILED` | 비디오 내보내기 실패 |
| `CLIP_NOT_FOUND` | 클립을 찾을 수 없음 |
| `INVALID_PARAMETERS` | 잘못된 요청 파라미터 |
| `UNAUTHORIZED` | 인증 실패 |
| `RATE_LIMIT_EXCEEDED` | 요청 한도 초과 |

---

## 상태 코드

| 상태 | 설명 |
|------|------|
| `pending` | 대기 중 |
| `uploading` | 업로드 중 |
| `processing` | 처리 중 |
| `completed` | 완료 |
| `failed` | 실패 |
| `expired` | 만료됨 |

---

## 구현 우선순위

### Phase 1 (MVP)
1. ✅ 비디오 업로드 API
2. ✅ 비디오 분석 결과 조회 API
3. ✅ 기본 JSON 응답 구조

### Phase 2 (편집 기능)
4. 클립 편집 저장 API
5. 편집된 클립 내보내기 API
6. 내보내기 상태 확인 API

### Phase 3 (다운로드)
7. 클립 다운로드 API
8. S3 직접 다운로드 링크 생성

---

## 참고사항

### S3 URL 형식
- 원본 비디오: `https://s3.{region}.amazonaws.com/{bucket}/original/{videoId}.mp4`
- 생성된 클립: `https://s3.{region}.amazonaws.com/{bucket}/clips/{clipId}.mp4`
- 편집된 클립: `https://s3.{region}.amazonaws.com/{bucket}/exports/{exportId}.mp4`

### 비디오 처리 파이프라인
1. 업로드 → S3 저장
2. AI 분석 (하이라이트 감지, 점수 계산)
3. 클립 생성 및 저장
4. 메타데이터 생성 (조회수, 참여도 예측)
5. 편집 요청 시 → FFmpeg 처리 (trim, speed, subtitles, aspect ratio)
6. 최종 비디오 생성 및 S3 저장

### 보안 고려사항
- S3 URL은 signed URL 사용 권장 (만료 시간 설정)
- API 인증: JWT 토큰 또는 API Key
- 파일 업로드 크기 제한: 최대 2GB
- Rate limiting: 사용자당 시간당 요청 제한
