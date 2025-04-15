import { store } from '../store';
import { setLoading, setError } from '../store/slices/authSlice';
import {
  setBadges,
  updateCodingStats,
  setLearningPaths,
  addFavoriteProblem,
  removeFavoriteProblem,
  updatePreferences,
  addSubmission,
} from '../store/slices/profileSlice';

class ProfileService {
  private static instance: ProfileService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return response.json();
  }

  private getAuthHeader(): HeadersInit {
    return {
      Authorization: `Bearer ${store.getState().auth.token}`,
    };
  }

  public async fetchProfileData(): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile`, {
        headers: this.getAuthHeader(),
      });

      const data = await this.handleResponse<{
        badges: any[];
        codingStats: any;
        learningPaths: any[];
        favoriteProblems: string[];
        preferences: any;
      }>(response);

      store.dispatch(setBadges(data.badges));
      store.dispatch(updateCodingStats(data.codingStats));
      store.dispatch(setLearningPaths(data.learningPaths));
      // Handle favorite problems and preferences
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch profile data'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async updateProfilePreferences(preferences: any): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile/preferences`, {
        method: 'PUT',
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const data = await this.handleResponse<{ preferences: any }>(response);
      store.dispatch(updatePreferences(data.preferences));
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to update preferences'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async toggleFavoriteProblem(problemId: string): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile/favorites/${problemId}`, {
        method: 'POST',
        headers: this.getAuthHeader(),
      });

      const data = await this.handleResponse<{ isFavorite: boolean }>(response);
      if (data.isFavorite) {
        store.dispatch(addFavoriteProblem(problemId));
      } else {
        store.dispatch(removeFavoriteProblem(problemId));
      }
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to toggle favorite'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async updateLearningPathProgress(pathId: string, progress: number): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile/learning-paths/${pathId}/progress`, {
        method: 'PUT',
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });

      await this.handleResponse(response);
      // The actual progress update is handled by the component
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to update progress'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async submitProblemSolution(
    problemId: string,
    solution: string,
    language: string
  ): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile/submissions`, {
        method: 'POST',
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemId, solution, language }),
      });

      const data = await this.handleResponse<{
        submission: any;
        stats: any;
      }>(response);

      store.dispatch(addSubmission(data.submission));
      store.dispatch(updateCodingStats(data.stats));
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to submit solution'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async fetchSubmissionHistory(): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/profile/submissions`, {
        headers: this.getAuthHeader(),
      });

      const data = await this.handleResponse<{ submissions: any[] }>(response);
      // Handle submission history
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch submission history'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }
}

export default ProfileService.getInstance(); 