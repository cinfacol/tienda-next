from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import NotYourProfile, ProfileNotFound
from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer, UpdateProfileSerializer


class AgentListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Profile.objects.filter(is_agent=True)
    serializer_class = ProfileSerializer


"""
    from rest_framework import api_view, permissions

    @api_view(["GET"])
    @permission_classes((permissions.IsAuthenticated))
    def get_all_agents(request):
        agents = Profile.objects.filter(is_agent=True)
        serializer=ProfileSerializer(agents, many=True)
        name_spaced_response={"agents": serializer.data}
        return Response(name_spaced_response,status=status.HTTP_200_OK)
"""


class TopAgentsListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Profile.objects.filter(top_agent=True)
    serializer_class = ProfileSerializer


class GetProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer]

    def get(self, request):
        try:
            user = self.request.user
            user_profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(user_profile, context={"request": request})

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Something went wrong when retrieving profile"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer]

    serializer_class = UpdateProfileSerializer

    def patch(self, request, username):
        try:
            Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise ProfileNotFound

        user_name = request.user.username
        if user_name != username:
            raise NotYourProfile

        data = request.data
        serializer = UpdateProfileSerializer(
            instance=request.user.profile, data=data, partial=True
        )
        print("data", data)
        print("serializer", serializer)

        serializer.is_valid()
        serializer.save()
        print("serializer_data", serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)