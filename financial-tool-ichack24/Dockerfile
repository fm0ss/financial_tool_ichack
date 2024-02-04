FROM python
COPY . .
ENV OPENAI_API_KEY=
ENV SERPER_API_KEY=
RUN pip install -r requirements.txt
RUN pip install requests beautifulsoup4
ENV PORT=5000
CMD python server.py
